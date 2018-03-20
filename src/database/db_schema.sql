BEGIN;

DROP TABLE IF EXISTS rates, currencies;

CREATE TABLE `currencies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL
);

CREATE TABLE `rates` (
  `fromcurrency_id` int(11) NOT NULL,
  `tocurrency_id` int(11) NOT NULL,
  `rate` float NOT NULL,
  `timestamp` int(11) NOT NULL
);

COMMIT;
