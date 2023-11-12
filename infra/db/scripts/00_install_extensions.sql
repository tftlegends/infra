DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector') THEN
        CREATE EXTENSION vector;
        RAISE NOTICE 'vector extension created successfully';
    ELSE
        RAISE NOTICE 'vector extension already exists';
    END IF;
END $$;
