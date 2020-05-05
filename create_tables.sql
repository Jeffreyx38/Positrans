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
    ('zona123', SHA1('1234'));

INSERT INTO `observation` (`user_ID`, `OBSERVATION`) VALUES
    (3, 'hello i feel well'),
    (3, 'im not good');


