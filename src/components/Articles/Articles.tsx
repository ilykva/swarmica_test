import {FC} from 'react';
import {useArticles} from './hooks/useArticles';
import styles from './styles.module.css';

const NO_RESULTS_TEXT = 'Нет результатов';
const READED_TEXT = 'Прочитана';

const HL_REGEX = /<hl>(.*?)<\/hl>/g;

const replaceHlTags = (text: string) =>
  text.replace(HL_REGEX, (_, highlightedText) =>
    `<span class="${styles.highlight}">${highlightedText}</span>`
  );

export const Articles:FC = () => {
  const {articles, isArticlesLoading, onArticleClick, readArticles} = useArticles();

  return (
    <div className={styles.articles} >
      {isArticlesLoading ? (
        <div className={styles.spinner}/>
      ) : articles?.length ?
        articles?.map(({ id, highlight }) => {
          const isArticleRead = readArticles.includes(id);

          return (
            <div key={id} className={styles.article} onClick={() => onArticleClick(id)}>
              <div className={styles.articleHeader}>
                <h1>{highlight.title}</h1>
                {isArticleRead && (
                  <span>{READED_TEXT}</span>
                )}
              </div>
              <pre dangerouslySetInnerHTML={{ __html: replaceHlTags(highlight.body) }}></pre>
            </div>
          )
        }) : (
          <div>{NO_RESULTS_TEXT}</div>
        )}
    </div>
  );
}