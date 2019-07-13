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

require('sp-init');
require('microsoft-ajax');
require('sp-runtime');
require('sharepoint');
require('taxonomy');

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
      </div>`;
      this.someFunction();


  }


public someFunction(){

    let loadedTerms = [];

    const context: SP.ClientContext = new SP.ClientContext(this.context.pageContext.web.absoluteUrl); 
    console.log("context", context);


    //Current Taxonomy Session
    var taxSession = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);

    console.log("taxSession", taxSession);

    //Term Stores
    var termStores = taxSession.get_termStores();

    console.log("termStores", termStores);

    context.load(termStores);

    context.executeQueryAsync(
      ()=>{
        console.log("loaded termStores", termStores);

        let firstStore = termStores.getItemAtIndex(0);

        console.log("firstStore", firstStore);


        //create termGroup
        let termCollection = firstStore.createGroup('truetime-test', SP.Guid.newGuid());

        context.load(termCollection);
        context.executeQueryAsync(
          ()=>{ 
            //created, spin up base structure
            console.log("loaded termCollection", termCollection);
            let projectsGuid = SP.Guid.newGuid();
            termCollection.createTermSet('projects', projectsGuid, 1033);//1033 is english

          context.executeQueryAsync(
            ()=>{ console.log("created, and loaded");
                  //select project
                  //create sample project
                  let projectsTermSet = firstStore.getTermSet(projectsGuid);
                  
                  context.load(projectsTermSet);
                  context.executeQueryAsync(
                    ()=>{ console.log("success");
                          console.log("loaded projectsTermSet ", projectsTermSet);
                          projectsTermSet.createTerm("my first project", 1033, SP.Guid.newGuid());
                          context.executeQueryAsync(
                            ()=>{ console.log("success");},
                            ()=>{ console.log("fail")}
                          );

                        },
                    ()=>{ console.log("fail")}
                  );

                },
            ()=>{ console.log("fail")}
          );




          },
          (sender, args)=>{
            console.log(args.get_message());
            //will not create cause it already exists
            //select existing
            let projectsTermsetCollection = firstStore.getTermSetsByName("projects", 1033)

            context.load(projectsTermsetCollection);


            context.executeQueryAsync(
              ()=>{ console.log("success");
                    console.log("loaded proj", projectsTermsetCollection);
                    let termSetArray = projectsTermsetCollection.get_data();
                    console.log("data", termSetArray);



                    context.load(termSetArray[0]);
                    //context.load(data[1]);

                    context.executeQueryAsync(
                    ()=>{ console.log("success");
                          console.log("data[0]", termSetArray[0]);
                          let termCollection = termSetArray[0].getAllTerms();
                          context.load(termCollection);

                          context.executeQueryAsync(
                          ()=>{ console.log("success");
                                console.log("termCollection loaded", termCollection);
                                let enumerator = termCollection.getEnumerator();
                                while(enumerator.moveNext()) {
                                  let current = enumerator.get_current();
                                  console.log("current", current);
                                  let termObject = {}
                                  termObject[current.get_name()] = current.get_customProperties();
                                  loadedTerms.push(termObject)
                                }

                                console.log("loadedTerms", loadedTerms);


                              },
                          ()=>{ console.log("fail")});

                        },
                    ()=>{ console.log("fail")});


                  
                },
              ()=>{ console.log("fail")}
            );
            


          }
        );

      },
      (sender, args)=>{
        console.log("I FAILED");
        console.log(args.get_message());}
    );





      


    


    /*
    //Name of the Term Store from which to get the Terms.
    var termStore = termStores.getByName("Webbplatssamling - contoso.sharepoint.com-sites-SD1");

    console.log("termStore", termStore);

    //GUID of Term Set from which to get the Terms.
    let spGuid : SP.Guid = new SP.Guid("768ec8e4-fdff-4b6c-8742-521a73e4d73a");
    console.log("spGuid", spGuid);
    var termSet = termStore.getTermSet(spGuid);
    console.log("termSet", termSet);

    var terms = termSet.getAllTerms();
    console.log("terms", terms);

    context.load(terms);

    context.executeQueryAsync(function(){

      console.log("loaded terms", terms);

    },function(sender,args){

          console.log(args.get_message());

    });
    */

}

public helper(sender, args, callback){
  console.log(args.get_message());
  callback();
}
public nextFunc() {
  console.log("nextFunc()");
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


/*


  const context: SP.ClientContext = new SP.ClientContext(this.context.pageContext.web.absoluteUrl); 
  console.log("context", context);


    var oWebsite = context.get_web();
    
    var listCreationInfo = new SP.ListCreationInformation();
    listCreationInfo.set_title('CUSTOM LIST');
    listCreationInfo.set_templateType(SP.ListTemplateType.announcements);

    let oList = oWebsite.get_lists().add(listCreationInfo);

    context.load(oList);

    context.executeQueryAsync(
      ()=> {
      console.log("success");
      }, 
      (sender, args)=>{
        console.log('Request failed. ',args.get_message(), args.get_stackTrace());
      }
    );
*/