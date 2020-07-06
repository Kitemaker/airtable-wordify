import {initializeBlock, useBase,  useRecordById, useRecords, Loader, Button, Box,   useLoadable,
    useSettingsButton, Heading, 
    useWatchable,  Text, TextButton} from '@airtable/blocks/ui';
import React, {Fragment, useState, useCallback, useEffect} from 'react';
import {cursor} from '@airtable/blocks';
import {useSettings} from './settings';
import SettingsForm from './SettingsForm';
import {ViewType} from '@airtable/blocks/models';
var tokenizer = require( 'wink-tokenizer' );
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

var myTokenizer = tokenizer();
const wiktionary = require("wiktionary-node");
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }));
const cheerio = require('cheerio')
  
let stopWordList = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves','I',"The",'is', 'a','an',
                    'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself',
                    'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself',
                    'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what',
                    'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are',
                    'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did',
                    'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of',
                    'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before',
                    'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under',
                    'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any',
                    'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
                    'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should',
                    "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't",
                    'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't",
                    'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn',
                    "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]

// These values match the base for this example: https://airtable.com/shrIho8SB7RhrlUQL
const TABLE_NAME = 'Articles';
const TITLE_FIELD_NAME = 'Title';
const EXTRACT_FIELD_NAME = 'Extract';
const IMAGE_FIELD_NAME = 'Image';

// Airtable SDK limit: we can only update 50 records at a time. For more details, see
// https://github.com/Airtable/blocks/blob/master/packages/sdk/docs/guide_writes.md#size-limits--rate-limits
const MAX_RECORDS_PER_UPDATE = 50;

// The API endpoint we're going to hit. For more details, see
// https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_
const API_ENDPOINT = 'https://en.wikipedia.org/api/rest_v1/page/summary';
const  WIKTIONARY_API = 'https://en.wiktionary.org/w/api.php?action=query&titles=test'

function WikipediaEnrichmentBlock() {
    const base = useBase();
   
    const table = base.getTableByName(TABLE_NAME);
    const titleField = table.getFieldByName(TITLE_FIELD_NAME);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
   
    // useSettingsButton(() => setIsSettingsOpen(!isSettingsOpen));

    const {
        isValid,
        settings: {isEnforced, urlTable},
    } = useSettings();

    // load the records ready to be updated
    // we only need to load the word field - the others don't get read, only written to.
    const records = useRecords(table, {fields: [titleField]});

    // keep track of whether we have up update currently in progress - if there is, we want to hide
    // the update button so you can't have two updates running at once.
    const [isUpdateInProgress, setIsUpdateInProgress] = useState(false);

    // check whether we have permission to update our records or not. Any time we do a permissions
    // check like this, we can pass in undefined for values we don't yet know. Here, as we want to
    // make sure we can update the summary and image fields, we make sure to include them even
    // though we don't know the values we want to use for them yet.
    const permissionCheck = table.checkPermissionsForUpdateRecord(undefined, {
        [EXTRACT_FIELD_NAME]: undefined,
        [IMAGE_FIELD_NAME]: undefined,
    });

      // Caches the currently selected record and field in state. If the user
    // selects a record and a preview appears, and then the user de-selects the
    // record (but does not select another), the preview will remain. This is
    // useful when, for example, the user resizes the blocks pane.
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [selectedFieldId, setSelectedFieldId] = useState(null);

    const [recordActionErrorMessage, setRecordActionErrorMessage] = useState('');

    // cursor.selectedRecordIds and selectedFieldIds aren't loaded by default,
    // so we need to load them explicitly with the useLoadable hook. The rest of
    // the code in the component will not run until they are loaded.
    useLoadable(cursor);

    // Update the selectedRecordId and selectedFieldId state when the selected
    // record or field change.
    useWatchable(cursor, ['selectedRecordIds', 'selectedFieldIds'], () => {
        // If the update was triggered by a record being de-selected,
        // the current selectedRecordId will be retained.  This is
        // what enables the caching described above.
        if (cursor.selectedRecordIds.length > 0) {
            // There might be multiple selected records. We'll use the first
            // one.
            setSelectedRecordId(cursor.selectedRecordIds[0]);
        }
        if (cursor.selectedFieldIds.length > 0) {
            // There might be multiple selected fields. We'll use the first
            // one.
            setSelectedFieldId(cursor.selectedFieldIds[0]);
        }
    });

  // This watch deletes the cached selectedRecordId and selectedFieldId when
    // the user moves to a new table or view. This prevents the following
    // scenario: User selects a record that contains a preview url. The preview appears.
    // User switches to a different table. The preview disappears. The user
    // switches back to the original table. Weirdly, the previously viewed preview
    // reappears, even though no record is selected.
    useWatchable(cursor, ['activeTableId', 'activeViewId'], () => {
        setSelectedRecordId(null);
        setSelectedFieldId(null);
    });


    const activeTable = base.getTableByIdIfExists(cursor.activeTableId);

    useEffect(() => {
        // Display the settings form if the settings aren't valid.
        if (!isValid && !isSettingsOpen) {
            setIsSettingsOpen(true);
        }
    }, [isValid, isSettingsOpen]);

    // activeTable is briefly null when switching to a newly created table.
    if (!activeTable) {
        return null;
    }
    async function onButtonClick() {
        setIsUpdateInProgress(true);
        const recordUpdates = await getExtractAndImageUpdatesAsync(table, titleField, records);
        await updateRecordsInBatchesAsync(table, recordUpdates);
        setIsUpdateInProgress(false);
    }


    async function onFindWordClick() {
        setIsUpdateInProgress(true);
        const recordUpdates = await getExtractAndImageUpdatesAsync(table, titleField, records);
        await updateRecordsInBatchesAsync(table, recordUpdates);
        setIsUpdateInProgress(false);
    }

    return (
        <Box
            // center the button/loading spinner horizontally and vertically.
            position="absolute"
            top="0"
            bottom="0"
            left="0"
            right="0"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            {isUpdateInProgress ? (
                <Loader />
            ) : (
                <Fragment>
                     
                    <Box>
                        {isSettingsOpen ? (
                            <SettingsForm setIsSettingsOpen={setIsSettingsOpen} />
                        ) : (
                            <RecordPreviewWithDialog
                                activeTable={activeTable}
                                selectedRecordId={selectedRecordId}
                                selectedFieldId={selectedFieldId}
                                setIsSettingsOpen={setIsSettingsOpen}
                            />
                        )}
                        
                    </Box>
                    <Button
                        variant="primary"
                        onClick={onButtonClick}
                        disabled={!permissionCheck.hasPermission}
                        marginBottom={3}
                    >
                        Extract Data from Wikipedia
                    </Button>
                    {!permissionCheck.hasPermission &&
                        // when we don't have permission to perform the update, we want to tell the
                        // user why. `reasonDisplayString` is a human-readable string that will
                        // explain why the button is disabled.
                        permissionCheck.reasonDisplayString}
                 
                 
                </Fragment>
            )}
        </Box>
    );
}

// Shows a preview, or a dialog that displays information about what
// kind of services (URLs) are supported by this block.
function RecordPreviewWithDialog({
    activeTable,
    selectedRecordId,
    selectedFieldId,
    setIsSettingsOpen,
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Close the dialog when the selected record is changed.
    // The new record might have a preview, so we don't want to hide it behind this dialog.
    useEffect(() => {
        setIsDialogOpen(false);
    }, [selectedRecordId]);

    return (
        <Fragment>
            <Box
                // position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding="20px"
            >
                <RecordPreview
                    activeTable={activeTable}
                    selectedRecordId={selectedRecordId}
                    selectedFieldId={selectedFieldId}                
                    setIsSettingsOpen={setIsSettingsOpen}
                />
            </Box>      
        </Fragment>
    );
}

// Shows a preview, or a message about what the user should do to see a preview.
function RecordPreview({
    activeTable,
    selectedRecordId,
    selectedFieldId,
    setIsDialogOpen,
    setIsSettingsOpen,
}) {
    const {
        settings: {isEnforced, urlField, urlTable},
    } = useSettings();
    const [wordData, setWordData] = useState({word:'', definitions:{noun:[],verb:[],adjective:[],adverb:[]}});
    const table = (isEnforced && urlTable) || activeTable;
    const [getDataInProgress, setGetDataInProgress] = useState(false);
    const classes = useStyles();
    // We use getFieldByIdIfExists because the field might be deleted.
    const selectedField = selectedFieldId ? table.getFieldByIdIfExists(selectedFieldId) : null;
    // When using a specific field for previews is enabled and that field exists,
    // use the selectedField
    const previewField = (isEnforced && urlField) || selectedField;
    // Triggers a re-render if the record changes. Preview URL cell value
    // might have changed, or record might have been deleted.
    const selectedRecord = useRecordById(table, selectedRecordId ? selectedRecordId : '', {
        fields: [previewField],
    });

    // Triggers a re-render if the user switches table or view.
    // RecordPreview may now need to render a preview, or render nothing at all.
    useWatchable(cursor, ['activeTableId', 'activeViewId']);

    // This button is re-used in two states so it's pulled out in a constant here.
    // const viewSupportedURLsButton = (
    //     <TextButton size="small" marginTop={3} onClick={() => setIsDialogOpen(true)}>
    //         View supported URLs
    //     </TextButton>
    // );

    async function onWordClicked(event, word){
        setGetDataInProgress(true);
        console.log('event = ',event,'Word = ',word);
        let output = await getExtractWiktionarysAsync(word)
        setWordData(output);
        setGetDataInProgress(false);
    
    }

    if (
        // If there is/was a specified table enforced, but the cursor
        // is not presently in the specified table, display a message to the user.
        // Exception: selected record is from the specified table (has been opened
        // via button field or other means while cursor is on a different table.)
        isEnforced &&
        cursor.activeTableId !== table.id &&
        !(selectedRecord && selectedRecord.parentTable.id === table.id)
    ) {
        return (
            <Fragment>
                <Text paddingX={3}>Switch to the “{table.name}” table to see results.</Text>
                <TextButton size="small" marginTop={3} onClick={() => setIsSettingsOpen(true)}>
                    Settings
                </TextButton>
            </Fragment>
        );
    } else if (
        // activeViewId is briefly null when switching views
        selectedRecord === null &&
        (cursor.activeViewId === null ||
            table.getViewById(cursor.activeViewId).type !== ViewType.GRID)
    ) {
        return <Text>Switch to a grid view to see results</Text>;
    } else if (
        // selectedRecord will be null on block initialization, after
        // the user switches table or view, or if it was deleted.
        selectedRecord === null ||
        // The preview field may have been deleted.
        previewField === null
    ) {
        return (
            <Fragment>
                <Text>Select a cell to see results</Text>
                {/* {viewSupportedURLsButton} */}
            </Fragment>
        );
    } else {
        // Using getCellValueAsString guarantees we get a string back. If
        // we use getCellValue, we might get back numbers, booleans, or
        // arrays depending on the field type.
        const cellValue = selectedRecord.getCellValueAsString(previewField);

        if (!cellValue) {
            return (
                <Fragment>
                    <Text>The “{previewField.name}” field is empty</Text>
                    {/* {viewSupportedURLsButton} */}
                </Fragment>
            );
        } else {
                let wordList = getWords(cellValue);
                return (
                    <Fragment>
                    {(getDataInProgress)?
                    <Loader/>:                    
                    <Box >
                        {(wordData.word !=="")? 
                        <Fragment>
                                <Heading>{wordData.word.toUpperCase()}</Heading>   
                             {(wordData.definitions.noun.length>0)?
                             <div>                                        
                                    <Heading size="small">Noun</Heading>
                                    {wordData.definitions.noun.map((item,index)=>(
                                    <Text key={index}>&nbsp; {index+1}.&nbsp; {item}</Text> 
                                    ))} 
                            </div>:null
                            }              
                     
                           {(wordData.definitions.verb.length>0)?
                             <div>
                                <Heading size="small">Verb</Heading> 
                                {wordData.definitions.verb.map((item,index)=>(
                                <Text key={index}>&nbsp; {index+1}.&nbsp;{item}</Text>                       
                                ))}      

                             </div>:null
                            }
                                     {(wordData.definitions.adjective.length>0)?
                             <div>
                            <Heading size="small">Adjective</Heading>  
                            {wordData.definitions.adjective.map((item,index)=>(
                            <Text key={index}>&nbsp; {index+1}.&nbsp;{item}</Text> 
                           
                        ))}     
                             </div>:null}
                           
                             {(wordData.definitions.adverb.length>0)?
                             <div>
                                <Heading size="small">Adverb</Heading>   
                                {wordData.definitions.adverb.map((item,index)=>(
                                <Text key={index}>&nbsp; {index+1}.&nbsp;{item}</Text>                           
                                ))}    
                             </div>:null
                                }               
                        </Fragment> : null}
                    </Box> 
                    }                    
                    <Box marginTop="10px">
                         <div className={classes.root}>
                        {wordList.map((item,index)=>(
                             <Chip label={item}  clickable onClick={(event) => onWordClicked(event, item)} color="primary"/>
                            //  <Text>{item}</Text>
                        ))}            
                     
                        </div>
                    </Box>                  
                    </Fragment>
                );
            
        }
    }
}

function getWords(cellValueText) {
    if (!cellValueText) {
        return null;
    }
    else{

        let output = [];
        let tokens =  myTokenizer.tokenize(cellValueText);
        for(let i=0; i<tokens.length;i++){
            // check if word is already added
            if(output.findIndex(wrd => wrd === tokens[i].value) === -1){
                if(tokens[i].tag === 'word' && (stopWordList.findIndex(item => item === tokens[i].value) === -1) && tokens[i].value.length >2)
                {
                     output.push(tokens[i].value)
                } 
            }         
        }    
        return output;
    }
}

async function getWikiPageSectionText(word, index){

   
    let  requestOptions = {method: 'POST', redirect: 'follow', cors:true};  
    const requestUrl = "https://en.wiktionary.org/w/api.php?action=parse&format=json&page=" + word + "&prop=text&section=" + index + "&utf8=1&origin=*";
    console.log('requestUrl = ' ,requestUrl)
    const response = await fetch(requestUrl, requestOptions);   
    const result = await response.json();
    console.log('getWikiPageSectionText result = ', result);
    let html = result.parse.text['*'];
    return html
}

async function getWikiSectionText(word, sectionIndex){
    let sectionText = [];
    const $ = cheerio.load(await getWikiPageSectionText(word, sectionIndex));                    
    $('ol').find('li').each(function(i, elem) {
        sectionText[i] = $(this).text();
      });

      return sectionText

}

async function getExtractWiktionarysAsync(InputWord) {
    const recordUpdates = [];
    const wordLowerCase = InputWord.toLowerCase();
    let wordInfo = {noun:[], verb: [], adjective: [], adverb:[]}; 
    let wordPosData = {word: "" , definitions: wordInfo};
    try {
          
            var requestOptions = {
            method: 'POST',
            redirect: 'follow'
            };
            
            let response = await fetch("https://en.wiktionary.org/w/api.php?action=parse&format=json&page=" + wordLowerCase + "&prop=sections&utf8=1&origin=*", requestOptions)
            let result = await response.json();
           
            let sections = result.parse.sections;
               
                let section;
                let listitem;
                let noun = []; let verb = []; let adjective = []; let adverb = [];
                for(section of sections ){                    
                   
                    if(section.line === 'Noun' ){                                           
                      
                          let posText = await  getWikiSectionText(wordLowerCase, section.index);
                          wordInfo.noun = posText.slice(0,5)
                        
                    }
                    else if (section.line === 'Verb' ){                      
                     
                        let posText = await  getWikiSectionText(wordLowerCase, section.index);
                          wordInfo.verb = posText.slice(0,5)
                        
                    }
                                
                    else if(section.line === 'Adjective' ){                       
                     
                        let posText = await  getWikiSectionText(wordLowerCase, section.index);
                        wordInfo.adjective = posText.slice(0,5)
                    }
                    else if( section.line === 'Adverb'){                       
                        
                        let posText = await  getWikiSectionText(wordLowerCase, section.index);
                          wordInfo.adverb = posText.slice(0,5);
                    }                        
                }             
                console.log('wordinfo = ', wordInfo);
                //const [wordData, setWordData] = useState({word:'',pos:'',definitions:[]});
                wordPosData = {word: InputWord , definitions: wordInfo};

                
               
             

    }catch (error) {console.log(error);}

        // out of respect for the wikipedia API, a free public resource, we wait a short time
        // between making requests. If you change this example to use a different API, you might
        // not need this.
        // await delayAsync(50);
    
    return wordPosData;
}

async function getExtractAndImageUpdatesAsync(table, titleField, records) {
    const recordUpdates = [];
    for (const record of records) {
        // for each record, we take the article title and make an API request:
        const articleTitle = record.getCellValueAsString(titleField);
        const requestUrl = `${API_ENDPOINT}/${encodeURIComponent(articleTitle)}?redirect=true`;
        const response = await fetch(requestUrl, {cors: true});
        const pageSummary = await response.json();

        // then, we can use the result of that API request to decide how we want to update our
        // record. To update an attachment, you need an array of objects with a `url` property.
        recordUpdates.push({
            id: record.id,
            fields: {
                [EXTRACT_FIELD_NAME]: pageSummary.extract,
                [IMAGE_FIELD_NAME]: pageSummary.originalimage
                    ? [{url: pageSummary.originalimage.source}]
                    : undefined,
            },
        });

        // out of respect for the wikipedia API, a free public resource, we wait a short time
        // between making requests. If you change this example to use a different API, you might
        // not need this.
        await delayAsync(50);
    }
    return recordUpdates;
}

async function updateRecordsInBatchesAsync(table, recordUpdates) {
    // Fetches & saves the updates in batches of MAX_RECORDS_PER_UPDATE to stay under size limits.
    let i = 0;
    while (i < recordUpdates.length) {
        const updateBatch = recordUpdates.slice(i, i + MAX_RECORDS_PER_UPDATE);
        // await is used to wait for the update to finish saving to Airtable servers before
        // continuing. This means we'll stay under the rate limit for writes.
        await table.updateRecordsAsync(updateBatch);
        i += MAX_RECORDS_PER_UPDATE;
    }
}

function delayAsync(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

initializeBlock(() => <WikipediaEnrichmentBlock />);
