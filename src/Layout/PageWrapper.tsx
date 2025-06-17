import React, { ReactNode } from "react";
import { PageContainer, HeaderSection, HeaderTitle, ContentCard } from "./PageWrapper.styles";

interface PageWrapperProps {
	title: string;
	headerRight?: ReactNode;
	children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, headerRight, children }) => {
	return (
		<PageContainer>
			<HeaderSection>
				<HeaderTitle level={4}>{title}</HeaderTitle>
				{headerRight}
			</HeaderSection>

			<ContentCard>{children}</ContentCard>
		</PageContainer>
	);
};

export default PageWrapper;
