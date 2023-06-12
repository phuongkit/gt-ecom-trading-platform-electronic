USE gt_ecommerce;

CREATE OR REPLACE VIEW sentimentAnalysis 
AS
	SELECT p.id product_id, p.shop_id, fb.sentiment, COUNT(fb.sentiment) as count
    FROM tbl_feedback fb RIGHT OUTER JOIN tbl_product p ON fb.product_id = p.id
    GROUP BY p.id, p.shop_id, fb.sentiment;

-- SELECT * FROM sentimentAnalysis;

DROP PROCEDURE IF EXISTS updateBlackListProduct;
drop temporary table if exists temp;
DELIMITER //
CREATE PROCEDURE updateBlackListProduct(IN inShopId BIGINT, IN inStartDate DATE, IN inMinAll INT,IN inMinNeg INT, IN startDateNewSession DATE)
BEGIN 
	DECLARE i, j, n, m INT DEFAULT 0;
    DECLARE currentDate DATETIME DEFAULT NOW();
    DECLARE scanAt DATETIME(6);
    DECLARE id, productId, shopId BIGINT DEFAULT NULL;
    DECLARE negTotal, total BIGINT DEFAULT 0;
    DECLARE percent DOUBLE DEFAULT 0;
    DECLARE slug VARCHAR(300) DEFAULT "";
    drop temporary table if exists originTemp;
	CREATE TEMPORARY TABLE originTemp AS 
    (SELECT  newp.product_id, newp.shop_id, oldp.id, oldp.scan_at, newp.neg_total, newp.total, newp.percent, newp.slug
	FROM
		(SELECT a.product_id, a.shop_id, a.slug, count neg_total, allCount total, (count * 100 / allCount) percent
		FROM 
			(SELECT p.id product_id, p.shop_id, COUNT(fb.sentiment) as count, p.slug
			FROM tbl_feedback fb RIGHT OUTER JOIN tbl_product p ON fb.product_id = p.id
			WHERE p.enabled = 1 AND fb.created_at >= inStartDate and fb.sentiment = 'SENTIMENT_NEGATIVE'
			GROUP BY p.id, p.shop_id, fb.sentiment) as a
			INNER JOIN
			(SELECT p.id product_id, p.shop_id, COUNT(fb.id) as allCount
			FROM tbl_feedback fb RIGHT OUTER JOIN tbl_product p ON fb.product_id = p.id
			WHERE p.enabled = 1 AND fb.created_at >= inStartDate
			GROUP BY p.id, p.shop_id) b
			ON a.product_id = b.product_id
		WHERE allCount >= inMinAll AND (count * 100 / allCount) >= inMinNeg) as newp
		LEFT OUTER JOIN tbl_product_black_list oldp
		ON newp.product_id = oldp.product_id
	WHERE oldp.status IS NULL or oldp.status = 1 
    AND newp.product_id NOT IN (SELECT DISTINCT product_id FROM tbl_product_black_list gr_pbl WHERE is_baned = 1));
    drop temporary table if exists groupTemp;
	CREATE TEMPORARY TABLE groupTemp AS 
    (SELECT product_id, shop_id, COUNT(*) FROM originTemp GROUP BY product_id, shop_id);
    SELECT count(*) FROM groupTemp INTO n;
    
    WHILE i < n DO
		SELECT groupTemp.product_id, groupTemp.shop_id FROM groupTemp LIMIT i,1 INTO productId, shopId;
        drop temporary table if exists oneTemp;
		CREATE TEMPORARY TABLE oneTemp AS (SELECT * FROM originTemp ot WHERE ot.product_id = productId AND ot.shop_id = shopId);
        SELECT ot.scan_at, ot.neg_total, ot.total, ot.percent, ot.slug FROM oneTemp ot  LIMIT 0,1 INTO scanAt, negTotal, total, percent, slug;
		IF scanAt IS NULL THEN
			INSERT INTO tbl_product_black_list(neg_total, percent, product_id, scan_at, shop_id, slug, status, total) 
            VALUES (negTotal, percent, productId, currentDate, shopId, slug, DEFAULT, total); 
		ELSE-- IF enabled <=> 0 THEN
			SELECT count(*) FROM oneTemp ot WHERE ot.scan_at < startDateNewSession INTO m;
            SET j = 0;
            WHILE j < m DO
				SELECT ot.id FROM oneTemp ot WHERE ot.scan_at < startDateNewSession LIMIT i,1 INTO id;
                UPDATE tbl_product_black_list SET status = 0 WHERE id = id;
                SET j = j + 1;
            END WHILE;
            SELECT count(*) FROM oneTemp ot WHERE ot.scan_at >= startDateNewSession INTO m;
            IF m < 2 THEN
				INSERT INTO tbl_product_black_list(neg_total, percent, product_id, scan_at, shop_id, slug, status, total) 
				VALUES (negTotal, percent, productId, currentDate, shopId, slug, DEFAULT, total); 
			ELSE 
				INSERT INTO tbl_product_black_list(is_baned, neg_total, percent, product_id, scan_at, shop_id, slug, status, total) 
				VALUES (1, negTotal, percent, productId, currentDate, shopId, slug, DEFAULT, total); 
			END IF;
			-- UPDATE tbl_product_black_list SET enabled = 0, last_scan_at = currentDate, neg_total = neg_total, total = total WHERE product_id = product_idd;
            -- UPDATE tbl_product SET enabled = 0 WHERE product_id = product_id;
        END IF;
        SET i = i + 1;
    END WHILE;
    drop temporary table if exists originTemp;
    drop temporary table if exists groupTemp;
    drop temporary table if exists oneTemp;
    SELECT * FROM tbl_product_black_list;
END; //
DELIMITER ;

-- SET @shop_id = NULL,
-- 	@startDate = DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY),
-- 	@minAll = 2,
--     @minNeg = 70,
--     @startNewSession = DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY);
-- CALL updateBlackListProduct(@shop_id, @startDate, @minAll, @minNeg, @startDateNewSession);

CREATE OR REPLACE VIEW lastCheckProductBlackList 
AS
	SELECT * FROM tbl_product_black_list gr_pbl
    WHERE scan_at = (SELECT scan_at FROM tbl_product_black_list gr_pbl ORDER BY scan_at DESC LIMIT 0, 1);
    
-- SELECT * FROM  lastCheckProductBlackList;
