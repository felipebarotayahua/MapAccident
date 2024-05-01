# Map Accident App

# Run program
- npm install
- npm init -y
- npm install express

node index.js
Run on port 8080
Preview web page





# How to generation a service account key from Google Cloud
# Go to the Google Cloud Console: Visit the Google Cloud Console at https://console.cloud.google.com/.
# Select your project: Choose the project that contains your Firestore database.
# Navigate to the IAM & Admin page: In the left sidebar, click on the "IAM & Admin" menu to expand it, then select "Service accounts".
# Create a new service account: Click on the "Create Service Account" button at the top of the page.
# Fill in the service account details: Enter a name for your service account and optionally provide a description. Click on the "Create" button.
# Assign roles (optional): You can assign one or more roles to your service account based on the level of access it requires. For interacting with Firestore, the "Firestore Admin" role or "Cloud Datastore Owner" role may be appropriate.
# Create and download the key: After creating the service account, you'll be prompted to create a key. Click on the "Create Key" button, then select the JSON key type. This will download a JSON file containing your service account key to your computer.
# Store the service account key securely: Store the downloaded JSON file in a secure location in your project directory. Make sure not to expose it publicly, as it grants access to your Google Cloud resources, including Firestore.