#!/bin/bash
source $directory/_scripts/functions.sh

if [ $# -eq 0 ]; then
    printDgErr "Argument for local (l), staging (s), or production (p) is required."
    exit 1
fi

frontEnvFile=$directory/../front/.env
>$frontEnvFile

printDgBnr "Setting ${ENV} environment variables..."

if [ $1 == "l" ]; then
    ENV="development"
    echo "PUBLIC_MEDIA_URL=\"$(pass dg/cms/l/mediaurl)\"" | tee -a $frontEnvFile >/dev/null
elif [ $1 == "s" ]; then
    ENV="staging"
    echo "PUBLIC_MEDIA_URL=\"\"" | tee -a $frontEnvFile >/dev/null
else
    ENV="production"
    echo "PUBLIC_MEDIA_URL=\"\"" | tee -a $frontEnvFile >/dev/null
fi

echo "PUBLIC_ENV=${ENV}" | tee -a $frontEnvFile >/dev/null
echo "API_KEY=\"$(pass dg/api/${1}/apikey)\"" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_API_PATH_NAVIGATION=$(pass dg/cms/api/paths/navigation)" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_API_PATH_HOME=$(pass dg/cms/api/paths/home)" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_API_PATH_FOOTER=$(pass dg/cms/api/paths/footer)" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_API_PATH_PRIVACY=$(pass dg/cms/api/paths/privacy)" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_API_PATH_POSTS_PAGE=$(pass dg/cms/api/paths/postspage)" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_API_PATH_POSTS=$(pass dg/cms/api/paths/posts)" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_API_PATH_POST=$(pass dg/cms/api/paths/post)" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_POSTS_PREVIEW_PARAMS=$(pass dg/cms/api/paths/posts/params/preview)" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_POST_PARAMS=$(pass dg/cms/api/paths/post/params)" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_API_PATH_CATEGORY=$(pass dg/cms/api/paths/category)" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_CATEGORY_PAGE_PARAMS=$(pass dg/cms/api/paths/category/params)" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_API_URL=\"$(pass dg/api/${1}/url)\"" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_SENTRY_DSN=\"$(pass dg/www/logs/sentrydsn)\"" | tee -a $frontEnvFile >/dev/null
