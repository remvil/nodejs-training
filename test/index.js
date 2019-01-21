// var https = require('https');
//
// function run(character) {
// 	/*
// 	* Some work here; return type and arguments should be according to the problem's requirements
// 	*/
// 	numberOfFilms = getNumberOfFilms(character)
// 	return numberOfFilms;
// }
//
// async function getNumberOfFilms(character) {
// 	return await Promise.all([
// 		getRequestPromise('https://challenges.hackajob.co/swapi/api/people/?format=json')
// 	]).then(results => {
// 		// get all peoples
// 	    var str = JSON.stringify(results[0].results);
// 	    var objectValue = JSON.parse(str);
// 	    var resStr = JSON.stringify(objectValue["name"]);
//
// 	    // get the character object
// 	    var characterObj = getNeedle(objectValue, character);
//       console.log(JSON.stringify(JSON.parse(characterObj)));
//       // console.log(JSON.stringify(characterObj.films));
// 	});
// }
//
// function getNeedle(obj, needle){
//   for (var i = 0; i < obj.length; i++){
//   // look for the entry with a matching `code` value
//     if (obj[i].name == needle){
//       // found it
//       return obj[i]
//     }
//   }
// }
//
// function getRequestPromise(url) {
// 	return new Promise((resolve, reject) => {
// 	    let request = https.get(url, (response) => {
// 	      if (response.statusCode < 200 || response.statusCode > 299) {
// 	         reject(new Error('Failed to load page, status code: ' + response.statusCode));
// 	       }
// 	      let body = [];
// 	      response.on('data', (chunk) => body.push(chunk));
// 	      response.on('end', () => resolve(JSON.parse(body.join(''))));
// 	    });
// 	    request.on('error', (err) => reject(err));
//     });
// }
//
// // describe("Solution", function () {
//   var input = "Chewbacca"
//   // var input = "Luke Skywalker"
//   let test = run(input)
//   // console.log(test);
//   // test.then(function(result){
//     // console.log(result);
//   // });
// // });

run(10,4,[2,4,5,6,0,8,9,10,34,67],[5,9,10,67])

function run(n, m, a, b) {
  /*
  * Some work here; return type and arguments should be according to the problem's requirements
  */
  longest_common_subseq = lcs(a,b,n,m);
  return longest_common_subseq;
}

function lcs(x,y,n,m){
  var s,i,j,
  lcs=[],row=[],c=[],
  left,diag,latch;
  //make sure shorter string is the column string
  if(m<n){
    s=x;x=y;y=s;
  }
  //build the c-table
  for(j=0;j<n;row[j++]=0);
  for(i=0;i<m;i++){
    c[i] = row = row.slice();
    for(diag=0,j=0;j<n;j++,diag=latch){
      latch=row[j];
      if(x[i] == y[j]){row[j] = diag+1;}
      else{
        left = row[j-1]||0;
        if(left>row[j]){row[j] = left;}
      }
    }
  }

  var t=i;
  console.log(c);
  return;
  while(i>1&&j>1){
    switch(c[i][j]){
      default:i--,j--;
      continue;
      case (i&&c[i-1][j]):
      if(t!==i){lcs.unshift(x.substring(i+1,t+1));}
      t=--i;
      continue;
      case (j&&c[i][j-1]): j--;
      if(t!==i){lcs.unshift(x.substring(i+1,t+1));}
      t=i;
    }
  }
  if(t!==i){lcs.unshift(x.substring(i+1,t+1));}
  return lcs.join('');
}
