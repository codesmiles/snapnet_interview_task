Scenario You're building a mini document verification system for a client. 
Users can sign up, upload documents for verification, and check the status. 
Admins can view submitted documents. 
The system should queue documents for async verification, cache verification status using Redis, and follow modular and clean architecture practices. 
Required Tasks 
1. Authentication & Authorization 
● Implement: 
○ POST /auth/signup 
○ POST /auth/login → return JWT 
● Two roles: user and admin 
● Middleware or guard to protect routes:
○ Only users can upload 
○ Only admins can view all documents 2. Document Upload 
● POST /documents 
○ Authenticated users only 
○ Fields: documentType, documentUrl 
○ Save to DB with status: PENDING 
○ Push to RabbitMQ queue: verify_documents 
3. RabbitMQ Integration 
● After saving the document, push a message to a verify_document queue 
● Create a worker to consume the message and: 
○ Simulate a delay (e.g., 2s) 
○ Mark the document as "VERIFIED" or "FAILED" randomly 
● Update cache in Redis with doc status: TTL 10 mins 4. Get My Documents 
● GET /documents (User): ○ Return current user's documents 
○ Pull document statuses from Redis cache (fallback to DB if not found) 
5. Admin Endpoint 
● GET /admin/documents: 
○ Return all documents ○ Must be efficient: Paginated + filtered by status 
○ Use appropriate indexes in schema 6. Testing 
● Add minimal unit tests or integration tests for: 
○ Auth flow 
○ Document upload 
○ Queue worker logic What to Submit 
● Upload your code to GitHub and share the URL. Make sure the repository is public. 
● Short README explaining: 
○ How to run 
○ Architecture decisions (e.g. folder structure or service layers)