import { ArrowButton } from 'src/ui/arrow-button';

import { Text } from 'src/ui/text';

import { useRef, useState, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';

import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';

import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import clsx from 'clsx';

export type MainStyleType = {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
};

type StyleSelectorProps = {
	options: OptionType[];
	defaultOption: OptionType;
	styleProperty: keyof MainStyleType;
	title: string;
	isRadioGroup?: boolean;
	onChangeStyle: (value: Partial<MainStyleType>) => void;
};

type ArticleParamsFormProps = {
	applyStyles: (event: React.FormEvent) => void;
	resetStyles: (event: React.FormEvent) => void;
	onChangeStyle: (value: Partial<MainStyleType>) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLDivElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const openForm = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useOutsideClickClose({
		isMenuOpen,
		rootRef: asideRef,
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={openForm} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={props.applyStyles}
					onReset={props.resetStyles}>
					<Text size={31} weight={800} uppercase as={'h2'}>
						Задайте параметры
					</Text>
					<StyleSelector
						options={fontFamilyOptions}
						defaultOption={defaultArticleState.fontFamilyOption}
						styleProperty='--font-family'
						title='Шрифт'
						onChangeStyle={props.onChangeStyle}
					/>
					<StyleSelector
						options={fontSizeOptions}
						defaultOption={defaultArticleState.fontSizeOption}
						styleProperty='--font-size'
						title='Размер шрифта'
						isRadioGroup
						onChangeStyle={props.onChangeStyle}
					/>
					<StyleSelector
						options={fontColors}
						defaultOption={defaultArticleState.fontColor}
						styleProperty='--font-color'
						title='Цвет шрифта'
						onChangeStyle={props.onChangeStyle}
					/>
					<Separator />
					<StyleSelector
						options={backgroundColors}
						defaultOption={defaultArticleState.backgroundColor}
						styleProperty='--bg-color'
						title='Цвет фона'
						onChangeStyle={props.onChangeStyle}
					/>
					<StyleSelector
						options={contentWidthArr}
						defaultOption={defaultArticleState.contentWidth}
						styleProperty='--container-width'
						title='Ширина контента'
						onChangeStyle={props.onChangeStyle}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

const StyleSelector = ({
	options,
	defaultOption,
	styleProperty,
	title,
	isRadioGroup,
	onChangeStyle,
}: StyleSelectorProps) => {
	const [selectedOption, setSelectedOption] =
		useState<OptionType>(defaultOption);

	const handleChange = (value: OptionType) => {
		setSelectedOption(value);
		onChangeStyle({ [styleProperty]: value.value });
	};

	useEffect(() => {
		onChangeStyle({ [styleProperty]: selectedOption.value });
	}, [selectedOption]);

	return isRadioGroup ? (
		<RadioGroup
			name={`${styleProperty}Select`}
			options={options}
			selected={selectedOption}
			onChange={handleChange}
			title={title}
		/>
	) : (
		<Select
			selected={selectedOption}
			options={options}
			onChange={handleChange}
			title={title}
		/>
	);
};

type UseOutsideClickClose = {
	isMenuOpen: boolean;
	onChange: (newValue: boolean) => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

const useOutsideClickClose = ({
	isMenuOpen,
	rootRef,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onChange(false);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isMenuOpen]);
};
