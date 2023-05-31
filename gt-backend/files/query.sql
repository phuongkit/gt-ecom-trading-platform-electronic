USE gt_ecommerce;

CREATE OR REPLACE VIEW sentimentAnalysis 
AS
	SELECT p.id product_id, p.shop_id, fb.sentiment, COUNT(fb.sentiment) as count
    FROM tbl_feedback fb RIGHT OUTER JOIN tbl_product p ON fb.product_id = p.id
    GROUP BY p.id, p.shop_id, fb.sentiment;
--     
SELECT * FROM sentimentAnalysis;