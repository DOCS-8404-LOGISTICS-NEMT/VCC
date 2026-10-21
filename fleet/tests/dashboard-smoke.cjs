const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(require('path').join(__dirname,'../VCC_Fleet_Procurement_Dashboard_Phase2_1.html'),'utf8');
const nodes={};for(const m of html.matchAll(/<([a-z]+)[^>]*id="([^"]+)"[^>]*>/g)){let value=m[0].match(/value="([^"]*)"/)?.[1]||'';if(m[1]==='select'){const tail=html.slice(m.index).split('</select>')[0];value=(tail.match(/<option value="([^"]*)" selected/)||tail.match(/<option value="([^"]*)"/))?.[1]||''}nodes[m[2]]={value,innerHTML:'',textContent:'',addEventListener(){}}}
const ctx={document:{getElementById:id=>nodes[id],querySelectorAll:()=>[]},URL,Blob,setTimeout};vm.createContext(ctx);vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],ctx);const run=s=>vm.runInContext(s,ctx);
assert.equal(run('visible().length'),4);assert(nodes.cards.innerHTML.includes('13730'));assert(nodes.truckCards.innerHTML.includes('1430D'));assert.equal(run('data.filter(qualified).length'),0);assert.equal(run('financial({price:100000}).cost5>100000'),true);
nodes.apr.value='0';assert.equal(run('Number.isFinite(financial({price:100000}).cost5)'),true);nodes.annualMiles.value='0';nodes.trips.value='0';assert.equal(run('financial({price:100000}).perMile'),null);assert.equal(run('financial({price:100000}).perTrip'),null);assert.equal(run('safeURL("javascript:alert(1)")'),'');assert.equal(run('matches({...data[0],price:999999})'),true);
assert(nodes.cards.innerHTML.includes('13815'));
assert.equal(run("data.find(v=>v.stock==='1307D').current"),false);
// All confirmed document labels still cannot qualify an inaccessible van.
assert.equal(run("qualified({...data[0],access:'no',...Object.fromEntries(gates.map(k=>[k,'confirmed']))})"),false);
nodes.annualMiles.value='12000';nodes.serviceMiles.value='9000';nodes.trips.value='1000';
for(const id of ['tax','ship','upfit','ins','maint','clean','other','contingency','labor','liftMaint','fuelCost'])nodes[id].value='0';
nodes.down.value='20';nodes.term.value='24';
assert.equal(run('financial({price:100000}).cost5'),100000);
assert.equal(run('financial({price:100000}).annualTotal'),20000);
assert.equal(run('financial({price:100000}).perTrip'),20);
nodes.term.value='96';assert.equal(run('financial({price:100000}).cost5'),100000);
nodes.serviceMiles.value='13000';assert.equal(run('financial({price:100000}).perServiceMile'),null);
ctx.roundtrip=run('csv(data)');assert.equal(run('parseCSV(roundtrip).length'),13);const imported=run('importRows(roundtrip)');assert.equal(imported.accepted,12);assert.equal(imported.rejected,0);assert.equal(run('data.filter(qualified).length'),0);
assert.equal(run("data.filter(v=>v.classification==='SOURCE EVIDENCE').length"),6);
const before=run('data.length');run('importRows(roundtrip)');assert.equal(run('data.length'),before);
ctx.bad='name,price,miles,winter,access,url\nBad,-1,2,3,yes,https://example.com\nBad2,2,2,3,yes,javascript:alert(1)';assert.equal(run('importRows(bad).rejected'),2);
console.log('PASS: initialization, dual category rendering, qualification controls, no price cap, zero APR, zero denominators, CSV roundtrip, repeated-import deduplication and original-source preservation, invalid row rejection, safe links, 24/96-month principal accounting and service-mile validation. DOM stub checks; no browser layout verification.');

