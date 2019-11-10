#!/bin/sh
rm -rf treetagger
mkdir treetagger
cd treetagger

case "$(uname -s)" in

	Darwin)
		wget https://www.cis.uni-muenchen.de/\~schmid/tools/TreeTagger/data/tree-tagger-MacOSX-3.2.2.tar.gz
		tar -xvzf tree-tagger-MacOSX-3.2.2.tar.gz
		rm tree-tagger-MacOSX-3.2.2.tar.gz
		;;

   Linux)
     echo 'Linux'
     wget https://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/data/tree-tagger-linux-3.2.2.tar.gz
     tar -xvzf tree-tagger-linux-3.2.2.tar.gz
     rm tree-tagger-linux-3.2.2.tar.gz
     ;;

   *)
    echo 'Unknown system'
    exit;;
esac

# download scripts
wget https://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/data/tagger-scripts.tar.gz
tar -xvzf tagger-scripts.tar.gz
rm tagger-scripts.tar.gz

# download the installer
wget https://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/data/install-tagger.sh

# download the language files
wget https://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/data/english.par.gz
wget https://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/data/french.par.gz
wget https://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/data/spanish.par.gz

sh install-tagger.sh

pwd









