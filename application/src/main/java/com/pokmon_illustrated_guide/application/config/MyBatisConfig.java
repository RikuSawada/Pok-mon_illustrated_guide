package com.pokmon_illustrated_guide.application.config;

import javax.sql.DataSource;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

// @org.springframework.transaction.annotation.EnableTransactionManagementを付与し、
// アノテーション駆動(@Transactional)のトランザクション制御を有効にします。
@EnableTransactionManagement
// @org.mybatis.spring.annotation.MapperScanを付与し、Mapperインターフェースのスキャンを有効にします。
@MapperScan(basePackages = {"com.pokmon_illustrated_guide.application.infra.Postgres.repository","com.pokmon_illustrated_guide.application.infra.Postgres.mapper"},
		sqlSessionFactoryRef=("sqlSessionFactory"))
public class MyBatisConfig {

@Bean
public DataSourceProperties dataSourceProperties () {
	return new DataSourceProperties();
}

// データソースのBean定義をします。
@Bean("dataSource")
@Primary
public DataSource dataSource(@Qualifier("dataSourceProperties") DataSourceProperties dataSourceProperties) {
	return dataSourceProperties.initializeDataSourceBuilder().build();
}

// トランザクションマネージャーのBeanを定義します。
@Bean
public PlatformTransactionManager transactionManager(@Qualifier("dataSource") DataSource dataSource) {
	return new DataSourceTransactionManager(dataSource);
}

// org.mybatis.spring.SqlSessionFactoryBeanをBean定義します。
// これによりSqlSessionFactoryBeanを利用してSqlSessionFactoryが生成されます。
@Bean
public SqlSessionFactory sqlSessionFactory(@Qualifier("dataSource") DataSource dataSource) throws Exception {
//	TODO キャメルケースはapplication.propertiesに移行。その他設定も移行予定。
	Configuration configuration = new Configuration();
	configuration.setUseColumnLabel(true);
	configuration.setReturnInstanceForEmptyRow(true);

	SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
	sessionFactoryBean.setDataSource(dataSource);
	sessionFactoryBean.setConfiguration(configuration);

	return sessionFactoryBean.getObject();
}
}