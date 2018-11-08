import React from 'react';
import { useTranslation } from 'react-i18next/hooks';
import { Trans } from 'react-i18next';

const Translated = ({ children, ...props }) => {

    const [t,i18n] = useTranslation();

    return (
        <Trans t={t} i18n={i18n} {...props} >
            {children}
        </Trans>
    )

};

export default Translated