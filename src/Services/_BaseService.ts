import { Model, UpdateQuery, FilterQuery, Schema, Document, PopulateOptions } from "mongoose";
import { CrudOperationsEnum } from "../Utils";

abstract class BaseAbstract<T, I> {
  abstract create(payload: T): Promise<I>;
  abstract update(query: object, payload: UpdateQuery<I>): Promise<I | null>;
  abstract delete(id: string): Promise<void>;
  abstract findSingle(payload: object, options?: { projection?: object }): Promise<I | null>;
}

// Create a type instead of an interface
type MongoFilters<T> = FilterQuery<T> & {
  $text?: { $search: string };
};

type BaseServiceConstructorType<I> = {
  // Model: Model<I, SanitizeQueryHelpers<I>>;
  Model: Model<I>;
  serializer?: string[];
  allowedOperations?: CrudOperationsEnum[];
}

/**
 * Type for the projection object used in Mongoose queries.
 * @typedef {Object} ProjectionType
 * @property {string} [key] - The key of the field to project.
 * @property {0|1|{ $meta: "textScore" }} [value] - The value of the field to project.
*/
type ProjectionType = {
  [key: string]: 0 | 1 | { $meta: "textScore" };
};

/**
 * Function to handle not allowed operations.
 * @param {CrudOperationsEnum} operation - The operation that is not allowed.
 * @returns {never} - Throws an error.
 */
const notAllowedMsg = (operation: CrudOperationsEnum): never => {
  const err = new Error(`Operation ${operation} not allowed`);
  console.log(err)
  throw err;
};


/**
 * BaseService class that provides CRUD operations for Mongoose models.
 * @template T - Type of the payload for create and update operations.
 * @template I - Type of the Mongoose model instance.
 */
export default class BaseService<T, I> extends BaseAbstract<T, I> {
  private readonly Model: Model<I>;
  private readonly allowedOperations: CrudOperationsEnum[];
  protected readonly serializer: string[];

  /**
   * Constructor for BaseService.
   * @param {BaseServiceConstructorType<I>} builder - Object containing the model and allowed operations.
   */
  public constructor(builder: BaseServiceConstructorType<I>) {
    super();
    this.Model = builder.Model;
    this.serializer = builder.serializer || [];
    this.allowedOperations = builder.allowedOperations || Object.values(CrudOperationsEnum);
  }

  /**
   * finds a single document in the database.
   * @param payload object
   * @param options {projection?: object}
   * @returns I | null
   */
  async findSingle(payload: object, options?: { projection?: object, populate?: string[] }): Promise<I | null> {
    if (!this.allowedOperations.includes(CrudOperationsEnum.FINDSINGLE)) {
      notAllowedMsg(CrudOperationsEnum.FINDSINGLE);
    }
    console.log("Filtered Fields", this.serializer);
    const findSingle = await this.Model.findOne({ isDeleted: false, ...payload }, options?.projection).select(this.serializer.map(field => `-${field}`)).exec();

    if (findSingle !== null && options?.populate && options?.populate?.length > 0) {
      const doc = findSingle as Document<I>;
      const populateOptions: PopulateOptions[] = options.populate.map(path => ({ path, select: this.serializer.map(field => `-${field}`).join(" ") }));
      await doc.populate(populateOptions);
    }
    return findSingle as I | null;
  }

  /**
   * Creates a new document in the database.
   * @param {T} payload - The data to create the document with.
   * @returns {Promise<I>} - The created document.
   */
  async create(payload: T): Promise<I> {
    if (!this.allowedOperations.includes(CrudOperationsEnum.CREATE)) {
      notAllowedMsg(CrudOperationsEnum.CREATE);
    }
    const create = new this.Model(payload);
    await create.save();
    return create as I;
  }

  /**
   * Updates a document in the database.
   * @param {object} query - The query to find the document to update.
   * @param {UpdateQuery<I>} payload - The data to update the document with.
   * @returns {Promise<I | null>} - The updated document or null if not found.
   */
  async update(query: object, payload: UpdateQuery<I>): Promise<I | null> {
    if (!this.allowedOperations.includes(CrudOperationsEnum.UPDATE)) {
      notAllowedMsg(CrudOperationsEnum.UPDATE);
    }
    console.log("Filtered Fields", this.serializer);
    const update = await this.Model.findOneAndUpdate({isDeleted:false, ...query}, payload, {
      new: true,
    }).select(this.serializer.map(field => `-${field}`)).exec();
    return update as I | null;
  }

  /**
   * Deletes a document from the database.
   * @param {string} id - The ID of the document to delete.
   * @returns {Promise<void>} - A promise that resolves when the document is deleted.
   */
  async delete(id: string): Promise<void> {
    if (!this.allowedOperations.includes(CrudOperationsEnum.DELETE)) {
      notAllowedMsg(CrudOperationsEnum.DELETE);
    }
    console.log("Filtered Fields", this.serializer);

    await this.Model.findByIdAndDelete(id);
  }
}
