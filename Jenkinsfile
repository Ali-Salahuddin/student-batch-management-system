pipeline {
    agent any

    tools {
        nodejs 'Node22'
    }

    environment {
        ACR_NAME = 'studentbatchacr'
        ACR_LOGIN_SERVER = 'studentbatchacr.azurecr.io'

        AZURE_SUBSCRIPTION_ID = 'a135fe62-c442-48a2-a6fc-37b484589a4c'
        AZURE_TENANT_ID = '8334b546-4ada-47c2-ba82-bea55544f710'

        IMAGE_TAG = "${BUILD_NUMBER}"
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
                sh '''
                    docker build \
                    -t ${ACR_LOGIN_SERVER}/proj-backend:${IMAGE_TAG} \
                    ./backend
                '''
            }
        }

        stage('Docker Build Frontend') {
            steps {
                sh '''
                    docker build \
                    -t ${ACR_LOGIN_SERVER}/proj-frontend:${IMAGE_TAG} \
                    "./front end"
                '''
            }
        }

        stage('Azure Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'azure-sp',
                        usernameVariable: 'AZURE_CLIENT_ID',
                        passwordVariable: 'AZURE_CLIENT_SECRET'
                    )
                ]) {
                    sh '''
                        az login \
                            --service-principal \
                            --username "$AZURE_CLIENT_ID" \
                            --password "$AZURE_CLIENT_SECRET" \
                            --tenant "$AZURE_TENANT_ID"

                        az account set \
                            --subscription "$AZURE_SUBSCRIPTION_ID"

                        az account show
                    '''
                }
            }
        }

        stage('ACR Login') {
            steps {
                sh '''
                    az acr login --name "$ACR_NAME"
                '''
            }
        }

        stage('Push Docker Images') {
            steps {
                sh '''
                    docker push ${ACR_LOGIN_SERVER}/proj-backend:${IMAGE_TAG}
                    docker push ${ACR_LOGIN_SERVER}/proj-frontend:${IMAGE_TAG}
                '''
            }
        }
		stage('AKS Login') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'azure-sp',
                usernameVariable: 'AZURE_CLIENT_ID',
                passwordVariable: 'AZURE_CLIENT_SECRET'
            )
        ]) {
            sh '''
                az login \
                  --service-principal \
                  --username "$AZURE_CLIENT_ID" \
                  --password "$AZURE_CLIENT_SECRET" \
                  --tenant 8334b546-4ada-47c2-ba82-bea55544f710

                az account set \
                  --subscription a135fe62-c442-48a2-a6fc-37b484589a4c

                az aks get-credentials \
                  --resource-group student-batch-rg \
                  --name student-batch-aks \
                  --overwrite-existing

                kubectl get nodes
            '''
        }
    }
}
stage('Deploy to AKS') {
    steps {
        sh '''
            helm upgrade --install student-batch \
              ./backend/K8s/student-batch \
              --namespace proj \
              --create-namespace \
              --set backend.image.tag=${BUILD_NUMBER} \
              --set frontend.image.tag=${BUILD_NUMBER}
        '''
    }
}
    }

    post {
        success {
            echo "CI/CD image pipeline completed successfully!"
            echo "Images pushed with tag: ${IMAGE_TAG}"
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}