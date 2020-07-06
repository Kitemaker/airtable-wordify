/* eslint-disable react/prop-types */
// import {globalConfig, base} from '@airtable/blocks';
import {useBase, useGlobalConfig} from '@airtable/blocks/ui';
import {FieldType} from '@airtable/blocks/models';

// Constants that determine when more pictures are shown in the game.
export const MIN_AMOUNT_OF_PICTURES = 2;
export const MAX_AMOUNT_OF_PICTURES = 4;
export const COMPLETED_NAMES_BEFORE_MAX_AMOUNT_OF_PICTURES = 10;

/**
 * The keys that will be used to store fields in global config.
 */
export const ConfigKeys = Object.freeze({
    TABLE_ID: 'tableId',
    VIEW_ID: 'viewId',
    // ATTACHMENT_FIELD_ID: 'attachmentFieldId',
    // NAME_FIELD_ID: 'nameFieldId',
    QUESTION_FIELD_ID: 'questFieldId',
    OPT1_FIELD_ID : 'opt1FieldId',
    OPT2_FIELD_ID : 'opt2FieldId',
    OPT3_FIELD_ID : 'opt3FieldId',
    OPT4_FIELD_ID : 'opt4FieldId',
    ANS_FIELD_ID :'ansFieldId',
});

/**
 * @typedef {Object} Settings - The settings object.
 * @property {Table | null} table - The selected table.
 * @property {View  | null} view - The selected view.
 * @property {RecordQueryResult | null} queryResult - The query result that is used to get records from.
 * @property {Field | null} nameField - The name field.
 * @property {Field | null} attachmentField - The attachment field.
 */

/**
 * A React hook to access settings configured by the SettingsForm.
 * This will re-render when base schema changes, records change, or changes to global config happen.
 * This hook will also check for the existence of enough records to play the game.
 * @return {{isValid: boolean, message: string | null, settings: Settings}}
 */
export function useSettings() {
    const base = useBase();
    const globalConfig = useGlobalConfig();

    // Get all the settings.
    const table = base.getTableByIdIfExists(globalConfig.get(ConfigKeys.TABLE_ID));
    const view = table ? table.getViewByIdIfExists(globalConfig.get(ConfigKeys.VIEW_ID)) : null;
    const questFieldId = table? table.getFieldByIdIfExists(globalConfig.get(ConfigKeys.QUESTION_FIELD_ID)): null;
    const opt1FieldId = table? table.getFieldByIdIfExists(globalConfig.get(ConfigKeys.OPT1_FIELD_ID)): null;
    const opt2FieldId = table? table.getFieldByIdIfExists(globalConfig.get(ConfigKeys.OPT2_FIELD_ID)): null;
    const opt3FieldId = table? table.getFieldByIdIfExists(globalConfig.get(ConfigKeys.OPT3_FIELD_ID)): null;
    const opt4FieldId = table? table.getFieldByIdIfExists(globalConfig.get(ConfigKeys.OPT4_FIELD_ID)): null;
    const ansFieldId = table? table.getFieldByIdIfExists(globalConfig.get(ConfigKeys.ANS_FIELD_ID)): null;

    const queryResult = view ? view.selectRecords({fields: [questFieldId, opt1FieldId,opt2FieldId,opt3FieldId,opt4FieldId,ansFieldId ]}) : null;

    // Validate the settings.
    // const isNameFieldValid = nameField && nameField.type === FieldType.SINGLE_LINE_TEXT;
    
    const isquestFieldValid = questFieldId && questFieldId? questFieldId.type === FieldType.SINGLE_LINE_TEXT || questFieldId.type === FieldType.MULTILINE_TEXT: false;
   // const isAttachmentFieldValid =     attachmentField && attachmentField.type === FieldType.MULTIPLE_ATTACHMENTS;
   const isOptionsvalid = opt1FieldId && opt2FieldId && opt3FieldId && opt4FieldId && ansFieldId
    const isValid = queryResult && isquestFieldValid && isOptionsvalid;

    // Create a validation message if needed.
    let message;
    if (!table) {
        message = 'Pick a table';
    } else if (!view) {
        message = 'Pick a view';
    } else if (!questFieldId) {
        message = 'Pick a question ';
    }
     else if (!isquestFieldValid){
         message = "Question field should be single or multline text"
    
    } else if (!isOptionsvalid) {
        message = 'Pick 4 options field';
    } else if (!ansFieldId) {
        message = 'Pick answer field ';
    } else {
        message = null;
    }

    return {
        isValid,
        message,
        settings: {
            table,
            view,
            queryResult,
            questFieldId,
            opt1FieldId,
            opt2FieldId,
            opt3FieldId,
            opt4FieldId,
            ansFieldId
        },
    };
}
