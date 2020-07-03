// establish button trigger
const ics = require('ics');
const { writeFileSync } = require('fs')


$("#FormSubmitButton").on("click", function() {
    console.log("Start data cleaning");
    c_data = data_clean();
    console.log("End data cleaning");

    console.log("Start isc creation");

    ics.createEvent({
        title: c_data["name"] + "'s Virtual Plumber Meeting",
        description: c_data["decription"],
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        start: [parseInt(c_data["date"][0]), parseInt(c_data["date"][1]), parseInt(c_data["date"][2]), parseInt(c_data["time"][0]), parseInt(c_data["time"][1])], // year, month, day, hour, minute
        duration: {minutes: 45},
        attendees: [
            {name: c_data["name"], email: c_data["email"]}
        ]
    }, (error,value) => {
        if (error){
            console.log(error);
        }

        writeFileSync(`${__dirname}/vpcall.ics`,value)
    });

    console.log("End isc creation, file created");
});

// data grab function
function data_snag() {
    var name = document.getElementById('custName').value;
    var email = document.getElementById('custEmail').value;
    var desc = document.getElementById('custDescription').value;
    var date = document.getElementById('custCallDate').value;
    var time = document.getElementById('custStartTime').value;

    desc = desc + "\n" + get_VPCall();

    var c_data = {"name":name, "email":email, "description":desc, "date":date, "time":time };

    console.log("data_snag function result: " + c_data["name"] + " says: \n" + c_data["description"]);

    return(c_data);
};

// data clean function
function data_clean() {

    //get the data
    var c_data = data_snag();

    // clean date/time
    var time = c_data["time"];
    var date = c_data["date"];

    var split_date = date.split("-");
    var split_time = time.split(":");

    c_data["date"] = split_date;
    c_data["time"] = split_time;

    console.log("data_clean function result: " + c_data);

    return(c_data);

};

// combined create event/write to file function
// function event_create(){

//     //get the cleaned data
//     c_data = data_clean();

//     // Build ISC for export

//     console.log("Hey good job, buckaroo, we got through the other functions :)")
//     console.log("Test for testing: \n time: " + c_data["time"] + "\n date: " + c_data["date"])

//     // export ISC

//     return;
// };

function get_VPCall(){

    // get url for Virtual Plumber Call here :)

    return("  This eventually is a virtual plumber call url :/ ");
};

// probably push something out to console at some point