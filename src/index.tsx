import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	mainStyleType,
} from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { defaultArticleState } from './constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const defaultSyles = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	};

	const mainStyle = useRef<mainStyleType>(defaultSyles);
	const [stylesToApply, setStylesToApply] =
		useState<mainStyleType>(defaultSyles);

	const changeStyle = (value: Partial<mainStyleType>) => {
		mainStyle.current = { ...mainStyle.current, ...value };
	};

	const applyStyles = (event: React.FormEvent) => {
		event.preventDefault();
		setStylesToApply(mainStyle.current);
	};

	const resetStyles = (event: React.FormEvent) => {
		event.preventDefault();
		setStylesToApply(defaultSyles);
	};

	return (
		<main className={clsx(styles.main)} style={stylesToApply as CSSProperties}>
			<ArticleParamsForm
				onChangeStyle={changeStyle}
				applyStyles={applyStyles}
				resetStyles={resetStyles}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
