// Use this code for Google Docs, Slides, Forms, or Sheets.
function onOpen() {
  SlidesApp.getUi()
      .createMenu('🧑‍🚀 Model Viewer')
      .addItem('Open Sidebar', 'openDialog')
      .addItem('Open Overlay', 'openOverlay')
      .addToUi();

/*
  DocumentApp.getUi()
    .createMenu('Dialog')
    .addItem('Open', 'openDialog')
    .addToUi();

  SpreadsheetApp.getUi()
    .createMenu('Dialog')
    .addItem('Open', 'openDialog')
    .addToUi();
*/
}

function setData(id, newData) {
  var documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.setProperty(id, newData);
}

function getSelected() {
  var presentation = SlidesApp.getActivePresentation();
  var selection = presentation.getSelection();
  var selectionType = selection.getSelectionType();
  
  if (selectionType == SlidesApp.SelectionType.PAGE_ELEMENT)
  {
    var currentPage = selection.getCurrentPage();
    var pageElements = selection.getPageElementRange().getPageElements();
    Logger.log('Number of page elements selected: ' + pageElements.length);

    // can only return primitive values here, so we return object IDs.
    return pageElements.map(x => x.getObjectId());
  }

  return "none";
}

function openOverlay() {
  var htmlTemplate = HtmlService.createTemplateFromFile('Index');
  
  var html = htmlTemplate
    .evaluate()
    .setWidth(800)
    .setHeight(600);

  SlidesApp.getUi()
      .showModelessDialog(html, 'Create Model Images');
}

function openDialog() {

  var data = new Array();
  
  var documentProperties = PropertiesService.getDocumentProperties();
  var presentation = SlidesApp.getActivePresentation();
  var slides = presentation.getSlides();
  for (var i = 0; i < slides.length; i++)
  {
    var images = slides[i].getImages();
    for(var j = 0; j < images.length; j++)
    {
      // images[j].replace(blobSource);
      var dataSet = {
        index: j,
        image: images[j],
        property: documentProperties.getProperty(images[j].getObjectId()),
      };
      data.push(dataSet);
    }
  }

  var htmlTemplate = HtmlService.createTemplateFromFile('Index');
  htmlTemplate.imageObjects = data;
  // Logger.log(htmlTemplate.getCode());

  var html = htmlTemplate.evaluate();

  SlidesApp.getUi()
      // .showModalDialog(html, 'Dialog title');
      .showSidebar(html);

/*
  DocumentApp.getUi()
      // .showModalDialog(html, 'Dialog title');
      .showSidebar(html);

  SpreadsheetApp.getUi()
      // .showModalDialog(html, 'Dialog title');
      .showSidebar(html);
*/
}