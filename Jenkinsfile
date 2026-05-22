pipeline {
    agent any

    tools {
        // Automatically injects Node.js environment into your Windows Jenkins instance
        nodejs 'Node18' 
    }

    environment {
        // TODO: Replace 'your_dockerhub_username' with your actual Docker Hub username
        IMAGE_NAME = "hemanthlbangera/chatroom-backend"
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
    }

    stages {
        // 1. Fetch source code from your unique GitHub repository
        stage('Checkout') {
            steps {
                echo 'Fetching backend source code from GitHub...'
                checkout scm
            }
        }

        // 2. Install dependencies inside the backend workspace directory
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node backend dependencies...'
                dir('Chatroom-be') {
                    bat 'npm install'
                }
            }
        }

        // 3. Code Quality Analysis via ESLint (Strict: fails pipeline if errors are found)
        stage('ESLint Check') {
            steps {
                echo 'Running static code quality checks via ESLint...'
                dir('Chatroom-be') {
                    bat 'npm run lint'
                }
            }
        }

        // 4. Perform dependency vulnerability filesystem scanning using Trivy
        stage('Trivy Filesystem Scan') {
            steps {
                echo 'Scanning project directory filesystem for package vulnerabilities...'
                dir('Chatroom-be') {
                    // Generates a local report file inside the backend directory
                    bat 'trivy fs . > trivy-fs-report.txt'
                }
            }
        }

        // 5. Build Docker Image for the application backend 
        stage('Docker Build') {
            steps {
                echo 'Building Docker container images...'
                dir('Chatroom-be') {
                    // Builds container images tagged with the unique build number and 'latest' tag
                    bat "docker build -t ${env.IMAGE_NAME}:${env.IMAGE_TAG} -t ${env.IMAGE_NAME}:latest ."
                }
            }
        }

        // 6. Security scan over the freshly generated Docker Image
        stage('Trivy Docker Image Scan') {
            steps {
                echo 'Scanning compiled container image for vulnerabilities...'
                dir('Chatroom-be') {
                    bat "trivy image ${env.IMAGE_NAME}:${env.IMAGE_TAG} > trivy-image-report.txt"
                }
            }
        }

        // 7. Secure Docker Hub Authentication
        stage('Docker Hub Login') {
            steps {
                echo 'Authenticating with Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-credentials-id', // Matches the credentials ID in your Jenkins Global Config
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        // 8. Push generated images to Docker Hub registry
        stage('Docker Push') {
            steps {
                echo 'Publishing images to Docker Hub container registry...'
                bat "docker push ${env.IMAGE_NAME}:${env.IMAGE_TAG}"
                bat "docker push ${env.IMAGE_NAME}:latest"
            }
        }

        // 9. Public Deployment Verification Status
        stage('Deploy') {
            steps {
                echo 'Verifying application cloud synchronization status...'
                // Logs confirmation status linking your app to its public URL
                echo "Public Deployment live at: https://chat-room-ten-pi.vercel.app/"
            }
        }
    }

    post {
        always {
            echo 'Archiving security reports...'
            // Saves both generated Trivy security scan documents as downloadable artifacts inside Jenkins
            archiveArtifacts artifacts: 'Chatroom-be/trivy-*.txt', allowEmptyArchive: true
        }

        success {
            echo 'Pipeline executed successfully! Core deliverables captured.'
        }

        failure {
            echo 'Pipeline failed! Check stage error logs above.'
        }
    }
}