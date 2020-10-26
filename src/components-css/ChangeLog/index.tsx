import React from 'react'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import Title from '../Title'
import Text from '../Text'

import styles from './styles.module.css'

export enum UpdateType {
  Fix = 'fix',
  Feature = 'feature',
}

interface Update {
  date: Date
  fixes: string[]
  features: string[]
  improves: string[]
}

interface Props {
  updates: {
    [version: string]: Update
  }
}

function ChangeLog({ updates }: Props) {
  return (
    <div className={styles.ChangeLog}>
      {Object.keys(updates).map(version => {
        const update = updates[version]

        return (
          <div key={version}>
            <Title h2>
              {version} [{format(update.date, 'LLLL yyyy', { locale: ru })}]
            </Title>
            {!!update.features.length && (
              <section className={styles.UpdateSection}>
                <div
                  className={styles.UpdateSectionLabel}
                  style={{ backgroundColor: 'hsl(148, 55%, 53%)' }}
                >
                  FEATURES
                </div>
                <ul>
                  {update.features.map((feature, index) => (
                    <li key={`feature-${index}`}>
                      <Text
                        dangerouslySetInnerHTML={{ __html: feature }}
                      ></Text>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {!!update.improves.length && (
              <section className={styles.UpdateSection}>
                <div
                  className={styles.UpdateSectionLabel}
                  style={{ backgroundColor: 'hsl(176, 100%, 37%)' }}
                >
                  IMPROVES
                </div>
                <ul>
                  {update.improves.map((improve, index) => (
                    <li key={`improve-${index}`}>
                      <Text
                        dangerouslySetInnerHTML={{ __html: improve }}
                      ></Text>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {!!update.fixes.length && (
              <section className={styles.UpdateSection}>
                <div
                  className={styles.UpdateSectionLabel}
                  style={{ backgroundColor: 'hsl(198, 81%, 65%)' }}
                >
                  FIXES
                </div>
                <ul>
                  {update.fixes.map((fix, index) => (
                    <li key={`fix-${index}`}>
                      <Text dangerouslySetInnerHTML={{ __html: fix }}></Text>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ChangeLog
