This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


This project is the GUI for [goparent](https://github.com/sasimpson/goparent).  Right now it requires running goparent locally, so make sure that is setup before you run this.

Clone/fork-clone the repo then:

  npm install
  npm start

then it should be running.  the install should grab all the dependencies.  if i left any out let me know.

## Using with minikube/k8s:

this has been designed to be deployed on a kubernetes environment.  Using minikube is great for development.  The first step is to build out the docker image for the containers (X.X is your version):

  docker build -t goparentgui:vX.X

then you just need to deploy that to your kubernetes instance with the deployment file:

  kubectl create -f k8s/deployment.yaml

this will setup the service and the deployment.  set the number of pods on the service or in the deployment file.

## ToDo:

- [x] add multiple children to a user to track
- [ ] add registration form
- [x] full convert to redux for state management instead of local state in most cases

## Thanks:

@github/parkedwards for helping me with the dodgy react and redux bits.  