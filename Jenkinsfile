pipeline {
    agent any
    stages {
        stage("Build") {
            steps {
                withCredentials([file(credentialsId: 'portfolio-builder-env', variable: 'ENV_PATH')]) {
                    sh '''
                        cp $ENV_PATH .production.env
                        mv .production.env .env.production

                        docker compose -f docker-compose.yml -f docker-compose.production.yml --env-file .env.production up

                        # Get the list of image names and their corresponding build numbers
                        images=$(docker images --format "{{.Repository}}:{{.Tag}}" | grep 'portfolio-builder-' | sort -t'-' -k2 -n)

                        # Get the last two image names
                        last_two_images=$(echo "$images" | tail -n 1)

                        # Iterate over the images and remove the old ones
                        echo "$images" | while read -r image_name; do
                          if ! echo "$last_two_images" | grep -q "$image_name"; then
                            echo "Removing image: $image_name"
                            docker rmi -f "$image_name"
                          else 
                            echo "Keeping image: $image_name"
                          fi

                        rm -fv ./.env.production

                        ls /var/www/jakehooper.pro/out

                        done
                    '''
                }
            }
        }
    }
}