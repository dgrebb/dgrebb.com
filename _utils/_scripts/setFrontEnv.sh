#!/bin/bash
source $DGPATH/_scripts/functions.sh

if [ $# -eq 0 ]; then
    printDgErr "Argument for local (l), staging (s), or production (p) is required."
    exit 1
fi

frontEnvFile=$DGPATH/../front/.env
>$frontEnvFile

printDgBnr "Setting ${ENV} environment variables..."

if [ $1 == "l" ]; then
    ENV="development"
elif [ $1 == "s" ]; then
    ENV="staging"
else
    ENV="production"
fi

echo "API_KEY=\"$(pass dg/api/${1}/apikey)\"" | tee -a $frontEnvFile >/dev/null
echo "RELEASE=\"local@$(cat $DGPATH/../front/package.json | jq -r '.version')"\" | tee -a $frontEnvFile >/dev/null
echo "PUBLIC_ENV=${ENV}" | tee -a $frontEnvFile >/dev/null
echo "ORIGIN=$(pass dg/www/${1}/domain)" | tee -a $frontEnvFile >/dev/null
echo "API_PATH_NAVIGATION=$(pass dg/cms/api/paths/navigation)" | tee -a $frontEnvFile >/dev/null
echo "API_PATH_HOME=$(pass dg/cms/api/paths/home)" | tee -a $frontEnvFile >/dev/null
echo "API_PATH_FOOTER=$(pass dg/cms/api/paths/footer)" | tee -a $frontEnvFile >/dev/null
echo "API_PATH_PRIVACY=$(pass dg/cms/api/paths/privacy)" | tee -a $frontEnvFile >/dev/null
echo "API_PATH_POSTS_PAGE=$(pass dg/cms/api/paths/postspage)" | tee -a $frontEnvFile >/dev/null
echo "API_PATH_POSTS=$(pass dg/cms/api/paths/posts)" | tee -a $frontEnvFile >/dev/null
echo "API_PATH_POST=$(pass dg/cms/api/paths/post)" | tee -a $frontEnvFile >/dev/null
echo "POSTS_PREVIEW_PARAMS=$(pass dg/cms/api/paths/posts/params/preview)" | tee -a $frontEnvFile >/dev/null
echo "POST_PARAMS=$(pass dg/cms/api/paths/post/params)" | tee -a $frontEnvFile >/dev/null
echo "API_PATH_CATEGORY=$(pass dg/cms/api/paths/category)" | tee -a $frontEnvFile >/dev/null
echo "CATEGORY_PAGE_PARAMS=$(pass dg/cms/api/paths/category/params)" | tee -a $frontEnvFile >/dev/null
echo "API_PATH_CV_PAGE=$(pass dg/cms/api/cv/landing)" | tee -a $frontEnvFile >/dev/null
echo "API_LANDING_PAGE_PARTIAL=$(pass dg/cms/api/cv/landing-partial)" | tee -a $frontEnvFile >/dev/null
echo "API_CV_COLLECTION_PARAMS=$(pass dg/cms/api/cv/collection-params)" | tee -a $frontEnvFile >/dev/null
echo "API_CV_PATH_LANDING_POSITION_LISTING=$(pass dg/cms/api/cv/position-listing)" | tee -a $frontEnvFile >/dev/null
echo "API_CV_PATH_LANDING_EXPERIENCE_LISTING=$(pass dg/cms/api/cv/experience-listing)" | tee -a $frontEnvFile >/dev/null
echo "API_URL=\"$(pass dg/api/${1}/url)\"" | tee -a $frontEnvFile >/dev/null
