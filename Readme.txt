-Install
npm install package.json

## RPA Stock Market ##

-require:
	selenium-webdriver
	fs
	json-2-csv
cmd:
	node RPAStockMarket.js

## RPA Challenge Input Forms ##

-require:
	selenium-webdriver
	xlsx

-base: challenge.xlsx

cmd:
	node RPA_InputForms.js