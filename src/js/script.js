// Make Project superclass
// make projects array
// render
// use jQuery

///////////////////////////
//// MODEL ////
///////////////////////////
// Project Class
var Project = function (stringName, stringId, stringSrc){
  this.name = stringName;
  this.id = stringId + '-project';
  this.linkId = stringId + '-link';
  this.src = stringSrc;
  this.url = '/' + stringId;
};

var projects = [];
  // Fill out array with the superclass
  projects[0] = new Project('Arcade Game', 'arcade-game',
    'img/arcade-game-525x300.jpg');
  projects[1] = new Project('Javascript Resume', 'js-resume',
    'img/js-resume-525x300.jpg');
  projects[2] = new Project('Website Design Mockup', 'web-design',
    'img/website-mockup-1-525-300.jpg');
  projects[3] = new Project('Mobile App Wireframe', 'mobile-wireframe',
    'img/mobile-app-wireframe-1-525x300.jpg');
  projects[4] = new Project('Wordpress Sites', 'wordpress',
    'img/wordpress-customization-525x300.jpg');
  projects[5] = new Project('Digital Designs', 'digital-design',
    'img/design-logo-525x300.jpg');
  projects[6] = new Project('Infographics', 'infographics',
    'img/db-infographic-525x300.jpg');
  projects[7] = new Project('Brand Development', 'brand-development',
    'img/Saddleback-Church-Ministry-Brand-525x300.jpg');

///////////////////////////
//// VIEW ////
///////////////////////////
// Declare for loop vars
var project, elem, link, header, img;
// Loop over the numbers in projects array
for (var i = 0; i < projects.length; i++) {

    // This is the number we're on...
    project = projects[i];

    // We're creating a DOM element for the number
    // dataset.toggle/target
    elem = document.createElement('div');
      elem.id = project.id;
      elem.className = 'col-xs-4 project';
    link = document.createElement('a');
      link.id = project.linkId;
      link.href = project.url;
      link.alt = project.name;
    img = document.createElement('img');
      img.src = project.src;
      img.className = 'img-responsive center-block img-rounded shadow highlight';
    header = document.createElement('h3');
      header.textContent = project.name;

    /* Modal needs to be standardized before this can work
    var modal = '<div class="modal" id="' + project.id + '" tabindex="-1" role="dialog" aria-labelledby="' +
        project.modalLabel + '" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="btn btn-default pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><h4 class="modal-title"' +
        'id="' + project.modalLabel + '">' + project.name + '</h4></div><div class="modal-body">' +
        project.desc + '</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>'
    */

    /* When we click, unhide project
    list.addEventListener('click', (function(projectCopy) {
        return function() {
          document.getElementById(projectCopy.name).classList.toggle('isHidden');
        };
    })(project));
    */

    // Append all the projects
    document.getElementById('featuredProjects').appendChild(elem);
    document.getElementById(project.id).appendChild(link);
    document.getElementById(project.linkId).appendChild(img);
    document.getElementById(project.id).appendChild(header);
}