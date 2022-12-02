echo "Seeding db for QA testing..."
echo "Deleting existing entries in test db..."
node seeder -d
echo "Importing entries based on Test Plan: RevB-11-26-22"
node seeder -i
