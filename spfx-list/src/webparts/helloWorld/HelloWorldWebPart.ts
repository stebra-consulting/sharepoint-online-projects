import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorld.module.scss';
import * as strings from 'helloWorldStrings';
import { IHelloWorldWebPartProps } from './IHelloWorldWebPartProps';


//i want to use sp.js...
require('sp-init');  
require('microsoft-ajax');  
require('sp-runtime');  
require('sharepoint');  
//...

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.helloWorld}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div> <div class="${styles.helloWorld}">  
       <div id="siteContent"></div>  
       <h1>Hello Donald!</h1>
     </div>`;  
   //this.loadListItems();    
  }

  public loadListItems(): void{  
 
  const context: SP.ClientContext = new SP.ClientContext(this.context.pageContext.web.absoluteUrl);  
  console.log("context", context);


  const listName = "truetime-calendar";

  var site = context.get_site();
  console.log("site", site);

  console.log("site.get_url())", site.get_url());
  console.log("site.get_path()", site.get_path());


  var web = context.get_web();
  console.log("web", web);

  console.log("web.get_url())", web.get_url());
  console.log("web.get_path()", web.get_path());


  //code here

  
} 

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
