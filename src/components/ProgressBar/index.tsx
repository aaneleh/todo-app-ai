import './styles.css';

const ProgressBar: React.FC<{ total: number, completed: number }> = ( { total, completed } ) => {

  return (
    <div id="progress-bar">
      <div className="progress-bar-label">
        <p>{completed} completed</p>
        <p>{total} total</p>
      </div>
      <div className="progress-bar-wrapper">
        <div className="progress-bar-fill" style={{ width: `${Math.round((completed/total) * 100)}%` }}>
          <p>{Math.round((completed/total) * 100)}%</p>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
