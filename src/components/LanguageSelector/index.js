
import React from 'react';
import styled from 'styled-components';
import { Select } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next/hooks';

export default () => {
    const [t, i18n] = useTranslation();

    const countryOptions = [
        { value: 'pt-BR', flag: 'br', text: t('language.brazillian-portuguese') },
        { value: 'en', flag: 'us', text: t('language.english') }
    ]

    const LangSelect = styled(Select)`
        font-size: 10;
        width:"200px";
    `

    return (
      <LangSelect
        onChange={(e, { value }) => i18n.changeLanguage(value)}
        placeholder={t('language.change')}
        options={countryOptions}
      />
    )
}