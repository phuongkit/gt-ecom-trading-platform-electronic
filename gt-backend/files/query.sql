USE gt_ecommerce;

-- CREATE OR REPLACE VIEW sentimentAnalysis 
-- AS
-- 	SELECT p.id product_id, p.shop_id, fb.sentiment, COUNT(fb.sentiment) as count
--     FROM tbl_feedback fb RIGHT OUTER JOIN tbl_product p ON fb.product_id = p.id
--     GROUP BY p.id, p.shop_id, fb.sentiment;
-- --     
-- SELECT * FROM sentimentAnalysis;
DROP PROCEDURE IF EXISTS updateBlackListProduct;
drop temporary table if exists temp;
DELIMITER //
CREATE PROCEDURE updateBlackListProduct(IN inShopId BIGINT, IN inStartDate DATE, IN inMinAll INT,IN inMinNeg INT)
BEGIN 
	DECLARE i,n INT DEFAULT 0;
    DECLARE currentDate DATE DEFAULT NOW();
    DECLARE scan_at DATETIME(6);
    DECLARE product_idd BIGINT;
    DECLARE shop_idd BIGINT;
    drop temporary table if exists temp;
	CREATE TEMPORARY TABLE temp AS 
    (SELECT  newp.product_id, newp.shop_id, enabled, oldp.scan_at FROM
	(SELECT a.product_id, a.shop_id
	FROM 
	(SELECT p.id product_id, p.shop_id, COUNT(fb.sentiment) as count
	FROM tbl_feedback fb RIGHT OUTER JOIN tbl_product p ON fb.product_id = p.id
	WHERE (inShopId IS NULL OR p.shop_id = inShopId) AND p.enabled = 1 AND fb.created_at >= inStartDate and fb.sentiment = 'SENTIMENT_NEGATIVE'
	GROUP BY p.id, p.shop_id, fb.sentiment) as a, (SELECT p.id product_id, p.shop_id, COUNT(fb.id) as allCount
	FROM tbl_feedback fb RIGHT OUTER JOIN tbl_product p ON fb.product_id = p.id
	WHERE (inShopId IS NULL OR p.shop_id = inShopId) AND p.enabled = 1 AND fb.created_at >= inStartDate
	GROUP BY p.id, p.shop_id) b
	WHERE a.product_id = b.product_id AND allCount >= inMinAll AND (count * 100 / allCount) >= inMinNeg) as newp
	LEFT OUTER JOIN tbl_product_black_list oldp ON newp.product_id = oldp.product_id);
    SELECT count(*) FROM temp INTO n;
    select * from temp;
    
    WHILE i < n DO
		SELECT temp.scan_at, temp.product_id, temp.shop_id INTO scan_at, product_idd, shop_idd FROM temp LIMIT i,1;
		IF scan_at IS NULL THEN
			INSERT INTO tbl_product_black_list(product_id, enabled, last_scan_at, scan_at, shop_id) 
            VALUES (product_idd, TRUE, NULL, currentDate, shop_idd); 
		ELSE-- IF enabled <=> 0 THEN
			UPDATE tbl_product_black_list SET enabled = 0, last_scan_at = currentDate WHERE product_id = product_idd;
--             UPDATE tbl_product SET enabled = 0 WHERE product_id = product_idd;
        END IF;
        SET i = i + 1;
    END WHILE;
    drop temporary table if exists temp;
    SELECT * FROM tbl_product_black_list;
END; //
DELIMITER ;

SET @shop_id = NULL,
	@startDate = DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY),
	@minAll = 2,
    @minNeg = 90;
CALL updateBlackListProduct(@shop_id, @startDate, @minAll, @minNeg);
