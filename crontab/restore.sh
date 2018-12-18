#!/bin/sh
# Backup directory
BACKUPS_DIR="/tmp/backups"
# Database user name
DBUSERNAME="maps_admin"
# Database password
DBPASSWORD="2NeBnAcvgnNHrQ73"

# Enter backup tgz
echo Enter backup.tgz file name:
# Read entered name
read BACKUP_NAME
# Decompress tgz
tar xvpfz $BACKUPS_DIR/$BACKUP_NAME

BACKUP_FOLDER=$(basename $BACKUPS_DIR/$BACKUP_NAME .tgz)

# Restoring mongo db
mongorestore --username $DBUSERNAME --password $DBPASSWORD $BACKUPS_DIR/$BACKUP_FOLDER --drop

rm -rf $BACKUP_FOLDER