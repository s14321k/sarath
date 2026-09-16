// Set this to your deployed worker URL, e.g. https://visit-ingest.yourname.workers.dev

//Cloud-Run
// window.VISIT_ENDPOINT = "https://visit-ingest-func-ofmel7gutq-el.a.run.app"

//Cloud-Run-function
// window.VISIT_ENDPOINT = "https://visit-ingest-342647168408.asia-south1.run.app"


// AWS
window.VISIT_ENDPOINT = "https://d1o3oz2umz6du6.cloudfront.net"

// AWS endpoint
// Use the local API while previewing the UI on localhost; keep the deployed
// endpoint for the production site.
// window.VISIT_ENDPOINT = window.location.hostname === 'localhost'
//     ? 'http://localhost:8080'
//     : 'https://visit-ingest-342647168408.asia-south1.run.app';

// Chat visibility toggle:
// false => only "sarath" can load/use chat
// true  => all logged-in users can load/use chat
window.CHAT_BOX_FOR_ALL = false;

// window.VISIT_ENDPOINT = "http://localhost:8080";
// cloud-function    //"https://visit-ingest-func-ofmel7gutq-el.a.run.app";
//                      "https://asia-south1-sarath-study.cloudfunctions.net/visit-ingest-func";

// Cloud-Run         //"https://visit-ingest-342647168408.asia-south1.run.app";


