import React, { Fragment } from 'react'
import { Header } from 'semantic-ui-react';
import PrettyPrintJson from '../../PrettyPrintJson';
import Generator from '../../services/generator'
import { useTranslation } from 'react-i18next/hooks';

export default () => {

    const [t, i18n] = useTranslation();

    return (
        <Fragment>
            <Header as='h3' style={{ fontSize: '2em' }}>
                {t('section.spell-generator')}
            </Header>
            <PrettyPrintJson data={new Generator(null, i18n.language).spell()} />
        </Fragment>
    )
}