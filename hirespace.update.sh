# This should only be run directly and located one directory above the project
echo y | docker image prune
cp HireSpace/.env hirespace.env
rm -rf HireSpace
git clone https://github.com/aLEGEND21/HireSpace
cp hirespace.env HireSpace/.env
rm -rf hirespace.env
cd HireSpace
bash hirespace.run.sh