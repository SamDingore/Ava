## **Ava**



***

Ava is a simple file server that allows you to run a small node process that takes the file and returns the file name that can be accessed on the same network.



***

###### **How to run Ava**

Using yarn



```txt
yarn install
```

If you do not already have uploads directory



```txt
mkdir uploads
```





```txt
yarn run start
```



The process will be running on port 8080



***

###### **API Documentation**

**Uploading files**

To upload files on the server, use the following route.

`sever_address/upload`

http request type: `post`

`post`request payload:

```txt
{
const formData = new FormData();
formData.append('file', selectedImage);
}
```

Example:&#x20;

Using [Axios](https://axios-http.com/ "Axios").&#x20;


```txt
const formData = new FormData();
formData.append('file', selectedImage);

const response = await Axios.post('http://localhost:8080/upload', formData {});
if (response.status === 200) {
    return response.data;
} else {
    return null;
}
```

`response.data `is a string containing filename and original extension.

**Accessing files**
The uploaded files can be accessed on the same server address.

`server_address/uploads/{file_name}`

Example:

`http://localhost:8080/uploads/342454.png`



***

Copyright © 2024 **Ava** by Sameer Dingore&#x20;
