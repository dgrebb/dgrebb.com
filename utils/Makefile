START = bash ./cli/scripts/set-env.sh -p
STARTL = bash ./cli/scripts/set-env.sh -l
END = gshred ../strapi/.env && rm ../strapi/.env

.PHONY: dcomposebuild dbuild drebuild dretag darchive dtag dpush run

dbuild:
	$(START)
	docker buildx build --platform linux/amd64 \
	-t cms.dgrebb.com ../strapi/.
	$(END)

dbuildlocal:
	$(STARTL)
	docker buildx build \
	--build-arg NODEENV=development \
	--platform linux/amd64 -t cms.dgrebb.com ../strapi/.
	$(END)

drebuild:
	$(START)
	docker buildx build \
	--platform linux/amd64 \
	--no-cache -t cms.dgrebb.com ../strapi/.
	$(END)

dretag:
	docker tag "$(ACRURL):latest" "$(ACRURL):last"

darchive:
	make dretag && docker rmi $(ACRURL):latest

dtag:
	docker tag cms.dgrebb.com:latest $(ACRURL):latest

dpush:
	aws ecr get-login-password --region $(REGION) | docker login --username AWS --password-stdin $(ACRURL)
	make darchive && make dtag && docker push $(ACRURL)

run:
	docker run -p 1337:1337 -it cms.dgrebb.com
	
db: 
	make dbuild

dbl: 
	make dbuildlocal

drb: 
	make drebuild

drt: 
	make dretag

da: 
	make darchive

dt: 
	make dtag

dp: 
	make drebuild
	make dpush

r:
	make run