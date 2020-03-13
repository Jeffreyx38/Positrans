CREATE TABLE `user` (
    `user_ID` INT NOT NULL AUTO_INCREMENT, 
    `NAME` VARCHAR(2048) COMMENT 'user name',
    `PASSWORD` VARCHAR(2048) COMMENT 'user password',
    PRIMARY KEY (`user_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `observation` (
    `observation_ID` INT NOT NULL AUTO_INCREMENT,
    `user_ID` INT NOT NULL, 
    `OBSERVATION` VARCHAR(2048) COMMENT 'user name',
    `DATE` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`observation_ID`),
    FOREIGN KEY (`user_ID`) REFERENCES user(`user_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user` (`NAME`, `PASSWORD`) VALUES
    ('jz553', '1234'),
    ('pb123', '1234');

INSERT INTO `observation` (`user_ID`, `OBSERVATION`) VALUES
    (3, 'hello i feel well'),
    (3, 'im not good');

SELECT OBSERVATION 
FROM user, observation 
WHERE (user.user_ID = observation.user_ID) 
AND (observation.user_ID = 5);
