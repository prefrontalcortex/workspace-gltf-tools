# Google Workspace glTF Tools and Ideas

## Get Started

Basic flow to create a bound script (has more access rights, can be turned into Workplace App later):

- create a new Google Slide presentation
- go to <kbd>Tools > Script Editor</kbd>
- recreate all the files from the `development/AttachedScript` folder
- save
- in the Slide, select <kbd>Dialog > Open</kbd>
- you'll have a sidebar open up on the right
- it lists all images in the Presentation plus custom data attached to them
- you can manipulate data by pressing buttons (but will only see the result after doing <kbd>Dialog > Open</kbd> again right now)
- in `Code.gs:66`, switch to "Index" instead of "Index2" to have a simple astronaut model-viewer but not connected to any custom data yet.

## Links / Ideas

"Workspace Add-Ons" are pretty limited; they can only display Cards via CardService (simple markup-like UIs), no custom HTML/JS.

"User Interfaces" can be more complex; they can use HtmlService to display fully fledged web apps as either overlays or sidebars. HtmlService also has a templating language that can be used to quickly pass data into HTML generation.  

Templating is interesting as well: it can directly call methods on the surrounding context.  
https://developers.google.com/apps-script/guides/html/templates#index.html_3  

Data can stored via PropertiesService (https://developers.google.com/apps-script/guides/properties). Those can save key-value pairs scoped to one document in which an add-on is used.  
One could probably, for example, store properties per image in a document (e.g. which source file and camera data was it created with) and then read that back for updating the image.  

HtmlService code can communicate with the server side (that is, the AppsScript host) via google.script.run/google.script.url/google.script.host. See https://developers.google.com/apps-script/guides/html/reference/run and https://developers.google.com/apps-script/guides/html/communication#code.gs_1.  

`SlidesApp.image.replace(blobSource:BlobSource)` seems to be able to programmatically replace content of an image.  
The notes there: 
> Replaces this image with an image described by a BlobSource object.  
Inserting the image fetches it from the BlobSource once and a copy is stored for display inside the presentation. Images must be less than 50MB in size, cannot exceed 25 megapixels, and must be in either in PNG, JPEG, or GIF format.  
In order to maintain the image's aspect ratio, the image is scaled and centered with respect to the size of the existing image.

Back-and-forth communication can only happen via client-to-server messaging and success handlers:  
https://developers.google.com/apps-script/guides/html/communication#index.html  

Some best practices here:  
https://developers.google.com/apps-script/guides/html/best-practices#page.html  

Cards quickstart:  
(only images + markdown, no HTML/JS, can open overlays from there)  
https://developers.google.com/apps-script/add-ons/cats-quickstart