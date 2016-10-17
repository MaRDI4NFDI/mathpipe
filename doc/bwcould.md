# This file describes the installation at bwcould

We have three vm
* [master (m)](https://bwcloud.ruf.uni-freiburg.de/dashboard/project/instances/59ed6501-fb62-4bbf-b2c4-b3b92665506e/)
IP 192.168.0.3, (runs mathpipe)
* [worker-1 (w1)](https://bwcloud.ruf.uni-freiburg.de/dashboard/project/instances/eec808f5-2603-4d1a-8bb6-4fb82ceb96ef/)
IP 192.168.0.5, (runs master branch of mathoid)
* [worker-2 (w2)](https://bwcloud.ruf.uni-freiburg.de/dashboard/project/instances/447dfc68-2210-42ad-86d9-8abe00ebe15c/)
IP 192.168.0.4, (runs master branch of mathoid v0.6.4)

and one [virtual network](https://bwcloud.ruf.uni-freiburg.de/dashboard/project/networks/2de311c0-0cec-4733-a022-d166eb175dfd/detail)
in the IP range 192.168.0.0/24.

### Test dataset
```
curl https://raw.githubusercontent.com/wikimedia/texvcjs/master/test/en-wiki-formulae.json > /data/mathpipe/allin.json
```
### Config
```
scp mathoid.yaml w1:/tmp/mathoid/config.yaml
scp mathoid.yaml w2:/tmp/mathoid/config.yaml
```
### Running
```
./bin/mathpipe compare /data/mathpipe/allin.json http://w1:10042/ http://w2:10042/ /data/mathpipe/out --verbose
  857  ls -R /data/mathpipe/out/ > /data/mathpipe/log.log
```

