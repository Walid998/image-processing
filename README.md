# image-processing
Image processing application that resize images 

### installation
```
npm i
```

### scripts

```
npm run build
```
convert typescript files to javascript

```
npm run dev
```
run server using nodemon "src/index"

```
npm run jasmine
```
combination between "jasmine" and "build" script


```
npm run test
```
combination between "pretteir", "lint" and "jasmine"


### Usage 

1. after ```npm run dev``` 
2. browse http://localhost:8083/api/images?filename=<filename.jpg>&width=<300>&height=<300>
3. choose any image file from ./src/assets/full and pass its name as a filename
4. cache usage: check your console if you try to resize an image with the same width & height

### Info

all used functions located in ./src/utitities/fileHandler.ts
which contains input & output paths and all functions that
handle filename, files directories and files existance
