//Importa Bibliotecas
const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const converter = require('json-2-csv');

(async function example() {
	
	//inicia Browser
	let driver = await new Builder().forBrowser('chrome').build();
	try {
		//navigate para rpachallenge RPA Stock
		await driver.get('http://rpachallenge.com/assets/rpaStockMarket/index.html');

		//Get Table
		await driver.findElements(By.tagName("table"));
		
		//Cria Array dos Json´s
		const datatable1 = new Array();
		const datatable2 = new Array();
		const datatable3 = new Array();

		//Pega todas as tables
		var tables = (await driver.findElements(By.tagName("table")));

		for (i = 0; i < tables.length; i++) {
			
			//Para Primeira Tabela
			if (i == 0) {
				
				//Pega as linhas
				var rows = (await tables[i].findElements(By.tagName("tr")));
				
				for (j = 0; j < rows.length; j++) {

					if (j == 0) {
						
						//Para Cabeaçalho
						var ths = (await rows[j].findElements(By.tagName("th")));
						
						//Ler os Heades
						var header0 = await ths[0].getText().then(function (text) {
							return text
						});
						var header1 = await ths[1].getText().then(function (text) {
							return text
						});
						var header2 = await ths[2].getText().then(function (text) {
							return text
						});
						var header3 = await ths[3].getText().then(function (text) {
							return text
						});
						
						//Push Array[]
						datatable1.push({
							"Coluna0": header0,
							"Coluna1": header1,
							"Coluna2": header2,
							"Coluna3": header3
						});

					} else {
						
						
						var tds = await rows[j].findElements(By.tagName("td"));
						
						//Pega todos os dados para datatable
						data0=await driver.executeScript('return document.getElementsByTagName("table")['+i+'].getElementsByTagName("tr")['+j+'].getElementsByTagName("td")[0].innerText').then(function (returnValue) {
							return returnValue
						});
						data1=await driver.executeScript('return document.getElementsByTagName("table")['+i+'].getElementsByTagName("tr")['+j+'].getElementsByTagName("td")[1].innerText').then(function (returnValue) {
							return returnValue
						});
						data2=await driver.executeScript('return document.getElementsByTagName("table")['+i+'].getElementsByTagName("tr")['+j+'].getElementsByTagName("td")[2].innerText').then(function (returnValue) {
							return returnValue
						});
						data3=await driver.executeScript('return document.getElementsByTagName("table")['+i+'].getElementsByTagName("tr")['+j+'].getElementsByTagName("td")[3].innerText').then(function (returnValue) {
							return returnValue
						});
						
						//Push Datatable array[]
						datatable1.push({
							"Coluna0": data0,
							"Coluna1": data1,
							"Coluna2": data2,
							"Coluna3": data3
						});
					}

				}
				
				//Grava em CSV
				converter.json2csv(datatable1, (err, csv) => {
					if (err) {
						throw err;
					}

					fs.writeFileSync('datatable1.csv', csv);
				});

			} else if (i == 1) {
				
				//Get linhas
				var rows = (await tables[i].findElements(By.tagName("tr")));

				for (j = 0; j < rows.length; j++) {
					
					//Get Headers
					if (j == 0) {
						//Pegar todos Heades
						var ths = (await rows[j].findElements(By.tagName("th")));

						var header0 = await ths[0].getText().then(function (text) {
							return text
						});
						var header1 = await ths[1].getText().then(function (text) {
							return text
						});
						
						//Push DataTable
						datatable2.push({
							"Coluna0": header0,
							"Coluna1": header1,
							"Coluna2": "",
							"Coluna3": ""
						});

					} else {
						
						//Get dados
						var tds = (await rows[j].findElements(By.tagName("td")));

						data0=await driver.executeScript('return document.getElementsByTagName("table")['+i+'].getElementsByTagName("tr")['+j+'].getElementsByTagName("td")[0].innerText').then(function (returnValue) {
							return returnValue
						});
						data1=await driver.executeScript('return document.getElementsByTagName("table")['+i+'].getElementsByTagName("tr")['+j+'].getElementsByTagName("td")[1].innerText').then(function (returnValue) {
							return returnValue
						});
						data2=await driver.executeScript('return document.getElementsByTagName("table")['+i+'].getElementsByTagName("tr")['+j+'].getElementsByTagName("td")[2].innerText').then(function (returnValue) {
							return returnValue
						});
						data3=await driver.executeScript('return document.getElementsByTagName("table")['+i+'].getElementsByTagName("tr")['+j+'].getElementsByTagName("td")[3].innerText').then(function (returnValue) {
							return returnValue
						});
						
						//Push DataTable
						datatable2.push({
							"Coluna0": data0,
							"Coluna1": data1,
							"Coluna2": data2,
							"Coluna3": data3
						});
					}

				}


				converter.json2csv(datatable2, (err, csv) => {
					if (err) {
						throw err;
					}

					fs.writeFileSync('datatable2.csv', csv);
				});

			} else if (i == 2) {
				
				//Get All Lines
				var rows = (await tables[i].findElements(By.tagName("tr")));

				for (j = 0; j < rows.length; j++) {

					if (j == 0) {
						
						//Get headers
						var ths = (await rows[j].findElements(By.tagName("th")));

						var header0 = await ths[0].getText().then(function (text) {
							return text
						});

						var header1 = await ths[1].getText().then(function (text) {
							return text
						});
						//Push Datatable
						datatable3.push({
							"Coluna0": header0,
							"Coluna1": header1
						});

					} else {
						
						//Pega todos os dados
						var tds = (await rows[j].findElements(By.tagName("td")));

						data0= await driver.executeScript('return document.getElementsByTagName("table")['+i+'].getElementsByTagName("tr")['+j+'].getElementsByTagName("td")[0].innerText').then(function (returnValue) {
							return returnValue
						});
						data1= await driver.executeScript('return document.getElementsByTagName("table")['+i+'].getElementsByTagName("tr")['+j+'].getElementsByTagName("td")[1].innerText').then(function (returnValue) {
							return returnValue
						});
						
						//Push DataTable
						datatable3.push({
							"Coluna0": data0,
							"Coluna1": data1
						});

					}

				}

				converter.json2csv(datatable3, (err, csv) => {
					if (err) {
						throw err;
					}

					fs.writeFileSync('datatable3.csv', csv);
				});
			}
		}
		
		//Get Todos thumbnails
		var thumbnail = (await driver.findElements(By.className("thumbnail")));
		
		//Create array
		const dataTable4 = new Array();

		for (i = 0; i < thumbnail.length; i++) {
			
			//Get Dados Thumbnail
			thumbnailText= await driver.executeScript('return document.getElementsByClassName("thumbnail")['+i+'].innerText').then(function (returnValue) {
				return returnValue
			});
			
			//Push DataTable
			dataTable4.push({
				"thumbnailText": thumbnailText
			});
		}

		converter.json2csv(dataTable4, (err, csv) => {
			if (err) {
				throw err;
			}
			fs.writeFileSync('dataTable4.csv', csv);
		});


	} catch (e) {

		console.log(e.message);

	} finally {

		await driver.quit();

	}
})();