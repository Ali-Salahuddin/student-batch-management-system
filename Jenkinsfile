pipeline {
    agent any

    tools {
        nodejs 'Node22'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Install') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Backend Build') {
            steps {
                dir('backend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Frontend Install') {
            steps {
                dir('front end') {
                    sh 'npm ci'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('front end') {
                    sh 'npm run build'
                }
            }
        }
		stage('Docker Build Backend') {
    steps {
        sh 'docker build -t studentbatchacr.azurecr.io/proj-backend:v1 ./backend'
    }
}

stage('Docker Build Frontend') {
    steps {
        sh 'docker build -t studentbatchacr.azurecr.io/proj-frontend:v1 "./front end"'
    }
}
    }

    post {
        success {
            echo 'CI pipeline completed successfully!'
        }

        failure {
            echo 'CI pipeline failed.'
        }
    }
}
