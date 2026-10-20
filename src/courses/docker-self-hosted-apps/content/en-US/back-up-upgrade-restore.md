> **Draft:** this lesson is an outline and will be expanded.

A copy of an app that holds real data is only safe if you can get the data back. In this lesson you will make a backup of the app's data, upgrade the app to a newer version, and practise going back if the upgrade goes wrong. You learned about volumes, the storage Docker keeps outside a container, in Docker for Beginners. Your note from the compose-file lesson says which volumes hold this app's data. At the end you will have a backup you have actually tested.

## What you will do

1. Open your note from the compose-file lesson and find which volumes hold the data. Ask your AI helper: "Give me the safest way to back up these volumes. Explain every command before I run it."
2. Stop the app, make the backup, and store the backup file somewhere outside your Docker setup, such as an external drive or a folder in your cloud storage.
3. Write down the version of the image you run now. Ask the AI to show you where the version is set in the compose file.
4. Upgrade: change the version to a newer one the project recommends, start the app again, and open it to check your data is still there. Always read the project's release notes first, because some versions need extra steps.
5. Practise going back: set the version to the earlier one and start the app again. Ask the AI whether the older version can still read the data after an upgrade, and take the answer from the release notes.
6. Practise restoring: in a spare test copy, restore your backup and open it.

**Safety note:** never delete a volume to "fix" a problem unless you have a backup you have already restored once. Deleting a volume deletes its data for good.

## Check yourself

- You have a backup file stored outside Docker.
- You have restored it at least once in a test copy.
- You know the version you are running and where to change it.
