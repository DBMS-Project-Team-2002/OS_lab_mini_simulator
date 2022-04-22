var memory = [];
var filled = [];
var row = {
	start: "",
	end: "",
	size: ""
};
var totalsize;
var numblocks;

var submitBtn = document.querySelector('#submitBtn');
//console.log('Welcome!');
submitBtn.onclick = getInitValues;

function getInitValues() {
	totalsize = document.querySelector('#totalMemSize').value;

	var message = 'Set total memory =' + totalsize;
	render(message, document.querySelector('#requestMsg'));
	var submitBlockBtn = document.querySelector('#submitBlockBtn');

	var blocksize0 = document.querySelector('#blockSize0');

	var i = 0;
	//initialize memory
	for(i = 0; i < totalsize; i++)
		memory[i] = -1;

	var requestBtn = document.querySelector('#submitRequestBtn');
	requestBtn.onclick = findHole;


	var removeBtn = document.querySelector('#removeBtn');
	removeBtn.onclick = removeBlock;
	function findHole() {
		var requestsize = document.querySelector('#requestSize').value;
		var requestid = document.querySelector('#requestId').value;
		var i;
		var alloc = 0;
		for(i = 0; i < totalsize; i++) {
			if(memory[i] != -1) {
				continue;
			}
			else {
				flag = 0;
				for(j = i; j < parseInt(requestsize) + parseInt(i); j++) {
					if(memory[j] != -1) {
						//console.log(j);
						flag++;
						i = j;
						break;
					}
				}
				if(!flag) {
					//allocate from i onwards
					limit = parseInt(i) + parseInt(requestsize);
					for(j = i; j < limit; j++)
						memory[j] = requestid;
					//update table
					var row = {
							id: requestid,
						        start: i,
						        end: limit,
						        size: requestsize,
					};
					filled.push(row);
					alloc = 1;
					render('Allocated from ' + row["start"] + ' to ' + row["end"] + ' to request', document.querySelector('#requestMsg'));
				}
			}
			if(alloc)
				break;
		}
		if(alloc == 0)
			render("Couldn't allocate request", document.querySelector('#requestMsg'));
		console.log(filled);
	}

	function removeBlock() {
		var remove = document.querySelector('#removeNum').value;
		//console.log(filled.length);
		var found = 0;
		for( var i = filled.length-1; i >= 0; i--) {
			if(filled[i]["id"] == remove) {
				found++;
				var start = parseInt(filled[i]["start"]);
				var end = parseInt(filled[i]["end"]);
				//console.log(start);
				//console.log(end);
				filled.splice(i, 1);
				break;
			}
		}
		if(found)
			render("Freed " + start + " to " + end, document.querySelector('#requestMsg'));
		else
			render("Cannot remove what does not exist", document.querySelector('#requestMsg'));
		for(var i = start; i < end; i++)
			memory[i] = -1;
	}
}

function render (template, node) {
	if(!node)
		return;
	node.innerHTML = template;
}
