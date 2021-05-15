const { Builder, By, Key, until } = require('selenium-webdriver');
const reader = require('xlsx')

// Reading our challenge file
const file = reader.readFile('./challenge.xlsx')

let data = []

const sheets = file.SheetNames

//Read Values XLSX
for (let i = 0; i < sheets.length; i++) {
	const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
	temp.forEach((res) => {
		data.push(res)
	})
}

(async function example() {
	let driver = await new Builder().forBrowser('chrome').build();
	try {
		
		//Navigate
		await driver.get('http://www.rpachallenge.com/');
		
		//Click Start
		await (await driver.findElement(By.xpath('/html/body/app-root/div[2]/app-rpa1/div/div[1]/div[6]/button'))).click()
		
		//Para cada valor de data
		for (j = 0; j < data.length; j++) {
			
			var jsonData = data[j]
			
			//Execute Javascript injection in browser
			await driver.executeScript('i = 0; do { if (document.getElementsByTagName("label")[i].innerText == "Email") { document.getElementsByTagName("input")[i].value = "' + jsonData["Email"] + '"; } else if (document.getElementsByTagName("label")[i].innerText == "Company Name") { document.getElementsByTagName("input")[i].value = "' + jsonData["Company Name"] + '"; } else if (document.getElementsByTagName("label")[i].innerText == "Role in Company") { document.getElementsByTagName("input")[i].value = "' + jsonData["Role in Company"] + '"; } else if (document.getElementsByTagName("label")[i].innerText == "Last Name") { document.getElementsByTagName("input")[i].value = "' + jsonData["Last Name "] + '"; } else if (document.getElementsByTagName("label")[i].innerText == "Address") { document.getElementsByTagName("input")[i].value = "' + jsonData["Address"] + '"; } else if (document.getElementsByTagName("label")[i].innerText == "Phone Number") { document.getElementsByTagName("input")[i].value = "' + jsonData["Phone Number"] + '"; } else if (document.getElementsByTagName("label")[i].innerText == "First Name") { document.getElementsByTagName("input")[i].value = "' + jsonData["First Name"] + '"; } else if (document.getElementsByTagName("label")[i].innerText == "Phone Number") { document.getElementsByTagName("input")[i].value = "' + jsonData["Phone Number"] + '"; } i++; } while (i < document.getElementsByTagName("label").length); document.querySelector("body > app-root > div.body.row1.scroll-y > app-rpa1 > div > div.inputFields.col.s6.m6.l6 > form > input").click(); return 1').then(function (returnValue) {
				console.log('Return Value ->' + returnValue);
			});
		}
		
		//Get Mensagem de sucesso!!!
		console.log("Mensagem de sucesso!!!")
		console.log(await (await driver.findElement(By.className('message2'))).getText())
		console.log(await (await driver.findElement(By.xpath('/html/body/app-root/div[2]/app-rpa1/div/div[1]/div[6]/button'))).getText())

	} catch (e) {
		
		//Exibe Erro.
		console.log(e.message);

	} finally {
		//Finaliza
		console.log("Mensagem de erro!!!")
		await driver.quit();

	}

})();