/*new list files under specified folder*/
      async function listMyFiles(folderid) {
        let fileList = [];
        let pageToken = "";
        do {
          const obj = await getPageTokenList(pageToken, folderid).catch(err => console.log(err));
          if (obj.result.files.length > 0) fileList = [...fileList, ...obj.result.files];
            pageToken = obj.result.nextPageToken;
        } while (pageToken);
        console.log(fileList)
      }
      function getPageTokenList(pageToken, folderid) {
        return new Promise((resolve, reject) => {
          gapi.client.drive.files.list({
            "includeItemsFromAllDrives": true,
            "orderBy": "name",
            "pageSize": 1000,
            "q": "'"+folderid+"' in parents",
            "supportsAllDrives": true,
            "fields": "files(id,name,fileExtension,starred,size),nextPageToken",
            "pageToken": pageToken
          }).then(res => resolve(res)).catch(err => reject(err));
      });
