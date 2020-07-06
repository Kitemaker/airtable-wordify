import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Text,
    Heading,
    Button,
    FormField,
    ViewPickerSynced,
    FieldPickerSynced,
    TablePickerSynced,
    useSettingsButton,
} from '@airtable/blocks/ui';
import {FieldType} from '@airtable/blocks/models';

import {useSettings, ConfigKeys} from './settings';
import FullScreenBox from './FullScreenBox';

/**
 * The settings form allows the user to configure the right table, view and fields for the game.
 */
export default function SettingsForm({onDone}) {
    // Use the `useSettings` hook to access the settings, and re-render whenever something changes.
    const {isValid, settings, message} = useSettings();
    console.log('settings = ', settings);
    useSettingsButton(onDone);
    return (
        <FullScreenBox display="flex" flexDirection="column">
            <Box flex="auto" padding={4} paddingBottom={2}>
                <Heading marginBottom={3}>Settings</Heading>
                <FormField label="Table">
                    <TablePickerSynced globalConfigKey={ConfigKeys.TABLE_ID} />
                </FormField>
                {settings.table && (
                    <FormField
                        label="View"
                        description="Only the records visible in this view will be used in the game."
                    >
                        <ViewPickerSynced
                            table={settings.table}
                            globalConfigKey={ConfigKeys.VIEW_ID}
                        />
                    </FormField>
                )}
                     {settings.table && (
                    <FormField label="Question field">
                        <FieldPickerSynced
                            table={settings.table}
                            globalConfigKey={ConfigKeys.QUESTION_FIELD_ID}
                            allowedTypes={[FieldType.SINGLE_LINE_TEXT, FieldType.MULTILINE_TEXT]}
                        />
                    </FormField>
                )}
                {settings.table && (
                    <FormField label="Option-1 field">
                        <FieldPickerSynced
                            table={settings.table}
                            globalConfigKey={ConfigKeys.OPT1_FIELD_ID}
                            allowedTypes={[FieldType.SINGLE_LINE_TEXT, FieldType.MULTILINE_TEXT]}
                        />
                    </FormField>
                )}
                   {settings.table && (
                    <FormField label="Option-2 field">
                        <FieldPickerSynced
                            table={settings.table}
                            globalConfigKey={ConfigKeys.OPT2_FIELD_ID}
                            allowedTypes={[FieldType.SINGLE_LINE_TEXT, FieldType.MULTILINE_TEXT]}
                        />
                    </FormField>
                )}
                   {settings.table && (
                    <FormField label="Option-3 field">
                        <FieldPickerSynced
                            table={settings.table}
                            globalConfigKey={ConfigKeys.OPT3_FIELD_ID}
                            allowedTypes={[FieldType.SINGLE_LINE_TEXT, FieldType.MULTILINE_TEXT]}
                        />
                    </FormField>
                )}
                   {settings.table && (
                    <FormField label="Option-4 field">
                        <FieldPickerSynced
                            table={settings.table}
                            globalConfigKey={ConfigKeys.OPT4_FIELD_ID}
                            allowedTypes={[FieldType.SINGLE_LINE_TEXT, FieldType.MULTILINE_TEXT]}
                        />
                    </FormField>
                )}
                   {settings.table && (
                    <FormField label="Answer field">
                        <FieldPickerSynced
                            table={settings.table}
                            globalConfigKey={ConfigKeys.ANS_FIELD_ID}
                            allowedTypes={[FieldType.NUMBER]}
                        />
                    </FormField>
                )}
                
           
            </Box>
            <Box display="flex" flex="none" padding={3} borderTop="thick">
                <Box
                    flex="auto"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    paddingRight={2}
                >
                    <Text textColor="light">{message}</Text>
                </Box>
                <Button onClick={onDone} disabled={!isValid} size="large" variant="primary">
                    Done
                </Button>
            </Box>
        </FullScreenBox>
    );
}

SettingsForm.propTypes = {
    onDone: PropTypes.func.isRequired,
};
