import { useTranslation } from 'react-i18next';
import './styles.css';

const ProgressBar: React.FC<{ total: number, completed: number }> = ( { total, completed } ) => {

  const { t } = useTranslation();

  return (
    <div id="progress-bar">
      <div className="progress-bar-label">
        <p>{completed} {t('home.progressCompleted')}</p>
        <p>{total} {t('home.progressTotal')}</p>
      </div>
      <div className="progress-bar-wrapper">
        { total > 0 ?
          <div className="progress-bar-fill" style={{ width: `${Math.round((completed/total) * 100)}%` }}>
            <p>{Math.round((completed/total) * 100)}%</p>
          </div>
        : 
        <div className="progress-bar-fill" style={{ width: `0%` }}>
            <p>0%</p>
          </div>
        }
      </div>
    </div>
  )
}

export default ProgressBar
